import PageLayout from '../components/PageLayout';
import ReceiptModal from '../components/ReceiptModal';
import { CreditCard, Download, Fuel, ChevronLeft, ChevronRight, Eye, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TransactionService, ReportService } from '../services/api';
import ProCard from '../components/ProCard';
import TransactionDataTable from '../components/TransactionDataTable';
import { formatRwf, formatLiters } from '../utils/format';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [activeReceipt, setActiveReceipt] = useState<any>(null);
  const [emailTxId, setEmailTxId] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await TransactionService.getMyHistory({ 
        page, 
        limit: 10,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined
      });
      setHistory(res.data.data || []);
      setMeta(res.data.meta || null);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page]);

  const handleDownloadReport = async () => {
    try {
      const res = await ReportService.downloadDriver('json', dateFrom, dateTo);
      downloadBlob(res.data, `fuel-history-${Date.now()}.json`);
    } catch {
      alert('Failed to download history report');
    }
  };

  const handleViewReceipt = async (transactionId: string) => {
    try {
      const res = await TransactionService.getReceipt(transactionId);
      setActiveReceipt(res.data.data);
    } catch {
      alert('Could not load receipt');
    }
  };

  const handleQuickEmail = async (transactionId: string) => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setEmailTxId(transactionId);
      return;
    }
    try {
      await TransactionService.emailReceipt(transactionId, email);
      alert(`Receipt sent to ${email}`);
    } catch {
      alert('Failed to email receipt');
    }
  };

  const columns = [
    { 
      id: 'transactionId', 
      label: 'Payment ID',
      render: (val: string) => (
        <span className="font-mono text-[11px] opacity-70">#{String(val).slice(-8).toUpperCase()}</span>
      )
    },
    { 
      id: 'totalAmount', 
      label: 'Total Amount',
      render: (val: number) => <span className="font-bold">{formatRwf(val)}</span>
    },
    { 
      id: 'stationName', 
      label: 'To',
      render: (val: string) => (
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 text-[10px] font-bold">
             {val?.charAt(0) || 'S'}
           </div>
           <span>{val || 'Kigali Station'}</span>
        </div>
      )
    },
    { 
      id: 'liters', 
      label: 'Volume',
      render: (val: number) => <span className="font-medium">{formatLiters(val)}</span>
    },
    {
      id: 'status',
      label: 'Status',
      render: (val: string) => (
        <span className={`text-xs font-bold uppercase ${val === 'COMPLETED' ? 'text-primary-500' : val === 'PENDING' ? 'text-chart-highlight' : 'text-danger'}`}>
          {val}
        </span>
      ),
    },
    { 
      id: 'createdAt', 
      label: 'Processed Date',
      render: (val: string) => (
        <div>
          <p className="font-medium">{new Date(val).toLocaleDateString()}</p>
          <p className="text-[10px] opacity-50">{new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      )
    },
    {
      id: '_receipt',
      label: 'Receipt',
      render: (_: unknown, row: { transactionId: string; status: string }) => (
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => handleViewReceipt(row.transactionId)}
            className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500"
            title="View receipt"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleQuickEmail(row.transactionId)}
            className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500"
            title="Email receipt"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout 
      title="Transaction History" 
      description="Track your fuel spending and download receipts"
      actions={
        <button 
          onClick={handleDownloadReport}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-primary-900 font-black uppercase tracking-widest rounded-2xl hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20"
        >
          <Download className="w-4 h-4" />
          Export History
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ProCard 
          title="Total Spent" 
          value={meta ? formatRwf(meta.totalSpent) : '0 RWF'} 
          subtitle="Lifetime consumption"
          icon={CreditCard}
          variant="primary"
        />
        <ProCard 
          title="Total Liters" 
          value={meta ? formatLiters(meta.totalLiters) : '0 L'} 
          subtitle="Fuel volume purchased"
          icon={Fuel}
          variant="secondary"
        />
      </div>

      <TransactionDataTable 
        columns={columns} 
        data={history} 
        loading={loading}
      />

      {emailTxId && (
        <div className="glass-card p-4 mt-4 flex gap-2 items-center">
          <input
            type="email"
            placeholder="Enter email for receipt"
            className="flex-1 px-3 py-2 rounded-lg bg-black/5 border border-black/10 text-sm"
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                const target = e.target as HTMLInputElement;
                if (target.value) {
                  localStorage.setItem('userEmail', target.value);
                  await TransactionService.emailReceipt(emailTxId, target.value);
                  setEmailTxId(null);
                  alert(`Receipt sent to ${target.value}`);
                }
              }
            }}
          />
          <button type="button" onClick={() => setEmailTxId(null)} className="text-sm text-text-muted">
            Cancel
          </button>
        </div>
      )}

      {activeReceipt && (
        <ReceiptModal receipt={activeReceipt} onClose={() => setActiveReceipt(null)} />
      )}

      {meta && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Page {page} · {meta.totalCount ?? history.length} transaction(s)
          </p>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="p-2 border border-[var(--border-base)] rounded-xl hover:bg-[var(--surface-base)] disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
            <button 
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-[var(--border-base)] rounded-xl hover:bg-[var(--surface-base)] transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[var(--text-primary)]" />
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

