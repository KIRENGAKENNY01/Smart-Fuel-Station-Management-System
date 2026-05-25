import { X, Download, Mail } from 'lucide-react';
import { useState } from 'react';
import { TransactionService } from '../services/api';

type Receipt = {
  receiptId: string;
  transactionId: string;
  stationId: string;
  fuelTypeId: string;
  liters: number;
  totalAmount: number;
  pricePerLiter: number;
  status: string;
  issuedAt: string;
  company: string;
};

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReceiptModal({
  receipt,
  onClose,
}: {
  receipt: Receipt;
  onClose: () => void;
}) {
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [emailStatus, setEmailStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleDownload = async () => {
    try {
      const res = await TransactionService.downloadReceipt(receipt.transactionId);
      downloadBlob(res.data, `receipt-${String(receipt.receiptId).slice(-8)}.json`);
    } catch {
      alert('Failed to download receipt');
    }
  };

  const handleEmail = async () => {
    if (!email) {
      setEmailStatus('Enter your email address');
      return;
    }
    setSending(true);
    setEmailStatus('');
    try {
      const res = await TransactionService.emailReceipt(receipt.transactionId, email);
      const previewUrl = res.data?.data?.previewUrl;
      if (previewUrl) {
        setEmailStatus(`Receipt sent! (Test mode — view at: ${previewUrl})`);
      } else {
        setEmailStatus(`Receipt sent to ${email}`);
      }
    } catch {
      setEmailStatus('Failed to send receipt email. Check server logs.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="glass-card w-full max-w-md p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-black/5"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold mb-1">{receipt.company} Receipt</h3>
        <p className="text-xs text-text-muted mb-6 font-mono">
          #{String(receipt.receiptId).slice(-8).toUpperCase()}
        </p>
        <dl className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <dt className="text-text-muted">Volume</dt>
            <dd className="font-bold">{receipt.liters} L</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Price / L</dt>
            <dd>{receipt.pricePerLiter.toLocaleString()} RWF</dd>
          </div>
          <div className="flex justify-between border-t border-black/10 dark:border-white/10 pt-3">
            <dt className="font-semibold">Total</dt>
            <dd className="font-black text-primary-500">
              {receipt.totalAmount.toLocaleString()} RWF
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Date</dt>
            <dd>{new Date(receipt.issuedAt).toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Status</dt>
            <dd className="uppercase text-xs font-bold">{receipt.status}</dd>
          </div>
        </dl>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-500 text-primary-900 font-bold rounded-xl text-sm"
          >
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-text-muted">Email receipt</label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 text-sm"
            />
            <button
              type="button"
              onClick={handleEmail}
              disabled={sending}
              className="px-4 py-2 bg-black/10 dark:bg-white/10 rounded-lg font-medium text-sm flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              Send
            </button>
          </div>
          {emailStatus && <p className="text-xs text-primary-500">{emailStatus}</p>}
        </div>
      </div>
    </div>
  );
}
