import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { NotificationService } from '../services/api';
import { Bell, AlertTriangle } from 'lucide-react';

const ALERT_TYPES = ['LOW_FUEL', 'FAILED_TRANSACTION', 'LOW_STOCK', 'INVENTORY_DROP', 'ABNORMAL_CONSUMPTION', 'ALERT'];

export default function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    NotificationService.getAll().then((res) => {
      const all = res.data.data || [];
      setAlerts(all.filter((n: { type: string }) => ALERT_TYPES.includes(n.type)));
    });
  }, []);

  return (
    <PageLayout title="Monitor Alerts" description="Low fuel, failed transactions, and inventory warnings">
      {alerts.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-muted">
          <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No active alerts</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {alerts.map((a) => (
            // Prisma returns `id` — no more `_id`
            <li key={a.id} className="glass-card p-4 flex gap-4 items-start">
              <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase text-danger">{a.type.replace(/_/g, ' ')}</span>
                <p className="text-sm font-medium mt-1">{a.message}</p>
                <p className="text-[10px] text-text-muted mt-1">{new Date(a.created_at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
