import PageLayout from '../components/PageLayout';
import ReceiptModal from '../components/ReceiptModal';
import { Check, Download, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TransactionService } from '../services/api';
import ProCard from '../components/ProCard';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, Droplet, CreditCard } from 'lucide-react';

export default function Sales() {
  const { stationId } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [sales, setSales] = useState<any[]>([]);
  const [receipt, setReceipt] = useState<any>(null);
  const sid = stationId || localStorage.getItem('stationId') || '';

  const load = async () => {
    if (!sid) return;
    const [st, sl] = await Promise.all([
      TransactionService.getManagerStats(sid),
      TransactionService.getStationSales(sid),
    ]);
    setStats(st.data.data);
    const list = sl.data.data || [];
    setSales([...list].sort((a, b) => (a.status === 'PENDING' ? -1 : 1)));
  };

  useEffect(() => { load(); }, [sid]);

  const confirm = async (id: string) => {
    try {
      await TransactionService.confirmPayment(id, localStorage.getItem('userEmail') || undefined);
      load();
      alert('Payment confirmed. Driver notified and receipt sent.');
    } catch (e: unknown) {
      alert((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Confirm failed');
    }
  };

  if (!sid) {
    return (
      <PageLayout title="Station Sales" description="Monitor sales, confirm payments, print receipts">
        <div className="glass-card p-8 text-center text-text-muted">
          <p className="font-medium">No station assigned to your account.</p>
          <p className="text-sm mt-2">Ask an admin to approve your manager application and assign a station, then log in again.</p>
        </div>
      </PageLayout>
    );
  }

  const pendingCount = sales.filter((t) => t.status === 'PENDING').length;

  return (
    <PageLayout title="Station Sales" description="Monitor sales, confirm payments, print receipts">
      {pendingCount > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-chart-highlight/10 border border-chart-highlight/30">
          <p className="font-semibold">{pendingCount} payment(s) need confirmation</p>
          <p className="text-sm text-text-muted mt-1">Click the green check icon in the table below to confirm each payment.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ProCard title="Today's Revenue" value={`${stats?.todayRevenue?.toLocaleString() || 0} RWF`} subtitle="Completed today" icon={TrendingUp} variant="primary" />
        <ProCard title="Liters Sold" value={`${stats?.todayLiters?.toLocaleString() || 0} L`} subtitle="Today" icon={Droplet} variant="secondary" />
        <ProCard title="Transactions" value={String(stats?.todayTransactions || 0)} subtitle="Today" icon={CreditCard} variant="accent" />
        <ProCard title="Pending" value={String(stats?.pendingPayments || 0)} subtitle="Awaiting confirmation" icon={CreditCard} variant="danger" />
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-text-muted border-b border-black/10">
              <th className="p-3">ID</th>
              <th className="p-3">Liters</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((t) => (
              <tr key={t._id} className="border-b border-black/5">
                <td className="p-3 font-mono text-xs">#{String(t._id).slice(-8)}</td>
                <td className="p-3">{t.liters} L</td>
                <td className="p-3 font-bold">{t.amount?.toLocaleString()} RWF</td>
                <td className="p-3">
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${t.status === 'PENDING' ? 'bg-chart-highlight/20 text-chart-highlight' : 'bg-primary-500/20 text-primary-500'}`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-3">{new Date(t.created_at).toLocaleString()}</td>
                <td className="p-3 flex gap-1">
                  {t.status === 'PENDING' && (
                    <button
                      type="button"
                      title="Confirm payment"
                      onClick={() => confirm(t._id)}
                      className="px-3 py-1.5 rounded-lg bg-primary-500 text-primary-900 text-xs font-bold flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Confirm
                    </button>
                  )}
                  {t.status === 'COMPLETED' && (
                    <>
                      <span className="px-3 py-1.5 rounded-lg bg-primary-500/20 text-primary-500 text-xs font-bold uppercase">
                        Completed
                      </span>
                      <button type="button" title="View receipt" onClick={async () => { const r = await TransactionService.getReceipt(t._id); setReceipt(r.data.data); }} className="p-2 rounded-lg hover:bg-black/5">
                        <Eye className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {receipt && <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />}
    </PageLayout>
  );
}
