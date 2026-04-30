import PageLayout from '../components/PageLayout';
import { Download, Filter } from 'lucide-react';

export default function Transactions() {
  return (
    <PageLayout 
      title="All Transactions" 
      description="View and filter all system-wide transactions"
      actions={
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      }
    >
      <div className="glass-card">
        <div className="flex justify-center items-center h-64 text-text-muted flex-col gap-2">
          <p className="font-medium">Transaction Table</p>
          <p className="text-sm">Fetching system transactions...</p>
        </div>
      </div>
    </PageLayout>
  );
}
