import PageLayout from '../components/PageLayout';
import { CreditCard, Download, Fuel } from 'lucide-react';
import { stats } from '../data/mockData';

export default function History() {
  return (
    <PageLayout 
      title="My History" 
      description="View your recent fuel purchases and transactions"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg">
          <Download className="w-4 h-4" />
          Download Receipt
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 text-primary-900 dark:text-primary-500 rounded-lg">
            <CreditCard className="w-8 h-8" />
          </div>
          <div>
            <p className="text-text-muted text-sm">Spent This Month</p>
            <p className="text-2xl font-bold">{stats.driver.spentThisMonth}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-primary-500/10 text-primary-900 dark:text-primary-500 rounded-lg">
            <Fuel className="w-8 h-8" />
          </div>
          <div>
            <p className="text-text-muted text-sm">Total Liters</p>
            <p className="text-2xl font-bold">120 L</p>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 className="font-semibold text-lg mb-6">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-text-muted text-sm border-b border-black/5 dark:border-white/10">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Station</th>
                <th className="pb-3 font-medium">Volume (L)</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-black/[0.02] dark:bg-white/[0.02]" : ""}>
                  <td className="py-4 font-medium px-2">Apr {28 - i}, 2026</td>
                  <td className="py-4 text-text-muted">Kigali Downtown Station</td>
                  <td className="py-4">40 L</td>
                  <td className="py-4 font-medium">58,000 RWF</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-900 dark:text-primary-500 rounded text-xs font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
