import { useEffect, useState } from 'react';
import { Bell, Check, Tag, Receipt, ShoppingBag, CreditCard } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { NotificationService, TransactionService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

// Prisma returns `id` — notification shape from backend
type Notification = {
  id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  transaction_id?: string;
};

const typeMeta: Record<string, { icon: typeof Bell; label: string; color: string }> = {
  PURCHASE_CONFIRMATION: { icon: ShoppingBag, label: 'Purchase', color: 'text-primary-500' },
  PAYMENT_PENDING: { icon: CreditCard, label: 'Pending payment', color: 'text-chart-highlight' },
  PAYMENT_RECEIPT: { icon: Receipt, label: 'Receipt', color: 'text-chart-highlight' },
  PROMOTION: { icon: Tag, label: 'Promotion', color: 'text-accent-500' },
  RECEIPT: { icon: Receipt, label: 'Receipt', color: 'text-chart-highlight' },
  PRICE_CHANGE: { icon: Tag, label: 'Price', color: 'text-text-muted' },
  ALERT: { icon: Bell, label: 'Alert', color: 'text-danger' },
};

function shortIdFromMessage(message: string) {
  return message.match(/#([a-f0-9]{8})/i)?.[1]?.toLowerCase() || null;
}

export default function Notifications() {
  const { role, stationId } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [stationTxns, setStationTxns] = useState<any[]>([]);

  const sid = stationId || localStorage.getItem('stationId') || '';
  const isManager = role === 'MANAGER' || role === 'ADMIN';

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await NotificationService.getAll();
      // Prisma returns `id` — normalize so the rest of the component uses `id`
      const list = (res.data.data || []).map((n: any) => ({
        ...n,
        id: n.id,
        transaction_id: n.transaction_id ? String(n.transaction_id) : undefined,
      }));
      setItems(list);
      if (isManager && sid) {
        const salesRes = await TransactionService.getStationSales(sid);
        setStationTxns(salesRes.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [sid, role]);

  // Transactions from getStationSales return `id` from Prisma
  const resolveTransactionId = (n: Notification): string | null => {
    if (n.transaction_id) return String(n.transaction_id);
    const short = shortIdFromMessage(n.message);
    if (!short) return null;
    const match = stationTxns.find((t) => String(t.id || t._id).slice(-8).toLowerCase() === short);
    return match ? String(match.id || match._id) : null;
  };

  const getTransactionStatus = (n: Notification): string | null => {
    const txId = resolveTransactionId(n);
    if (!txId) return null;
    return stationTxns.find((t) => String(t.id || t._id) === txId)?.status || null;
  };

  const markRead = async (id: string) => {
    await NotificationService.markAsRead(id);
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const confirmPayment = async (n: Notification) => {
    const txId = resolveTransactionId(n);
    if (!txId) {
      alert('Could not find this payment. Open Station Sales to confirm.');
      return;
    }
    setConfirming(n.id);
    try {
      await TransactionService.confirmPayment(txId);
      await markRead(n.id);
      await fetchNotifications();
      alert('Payment confirmed. Driver notified and receipt sent.');
    } catch (err: unknown) {
      alert(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Failed to confirm payment'
      );
    } finally {
      setConfirming(null);
    }
  };

  const unread = items.filter((n) => !n.is_read).length;

  return (
    <PageLayout
      title="Notifications"
      description={
        isManager
          ? 'Pending payments, confirmations, and station alerts'
          : 'Purchase confirmations, payment receipts, and fuel promotions'
      }
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-text-muted">
          {unread > 0 ? `${unread} unread` : 'All caught up'}
        </span>
      </div>

      {loading ? (
        <p className="text-text-muted">Loading notifications…</p>
      ) : items.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-muted">
          <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No notifications yet.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => {
            const meta = typeMeta[n.type] || typeMeta.ALERT;
            const Icon = meta.icon;
            const txStatus = isManager && n.type === 'PAYMENT_PENDING' ? getTransactionStatus(n) : null;
            const isCompleted = txStatus === 'COMPLETED';
            const canConfirm = isManager && n.type === 'PAYMENT_PENDING' && !isCompleted && txStatus === 'PENDING';

            return (
              <li
                key={n.id}
                className={clsx(
                  'glass-card p-4 flex gap-4 items-start',
                  !n.is_read && !isCompleted && 'ring-1 ring-primary-500/30',
                  isCompleted && 'opacity-80'
                )}
              >
                <div className={clsx('p-2 rounded-lg bg-black/5 dark:bg-white/5', meta.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                      {isCompleted ? 'Completed' : meta.label}
                    </span>
                    {!n.is_read && !isCompleted && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                  </div>
                  <p className="text-sm font-medium">{n.message}</p>
                  <p className="text-[10px] text-text-muted mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {isCompleted && (
                    <span className="px-4 py-2 bg-primary-500/20 text-primary-500 text-xs font-black uppercase rounded-lg whitespace-nowrap flex items-center gap-1">
                      <Check className="w-4 h-4" /> Completed
                    </span>
                  )}
                  {canConfirm && (
                    <button
                      type="button"
                      disabled={confirming === n.id}
                      onClick={() => confirmPayment(n)}
                      className="px-4 py-2 bg-primary-500 text-primary-900 text-xs font-black uppercase rounded-lg hover:bg-primary-600 disabled:opacity-50 whitespace-nowrap"
                    >
                      {confirming === n.id ? 'Confirming…' : 'Confirm payment'}
                    </button>
                  )}
                  {!n.is_read && !isCompleted && (
                    <button
                      type="button"
                      onClick={() => markRead(n.id)}
                      className="p-2 rounded-lg hover:bg-black/5 text-xs text-text-muted"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4 mx-auto" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </PageLayout>
  );
}
