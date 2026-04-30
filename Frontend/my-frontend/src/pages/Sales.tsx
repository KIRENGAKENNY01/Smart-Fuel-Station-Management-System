import PageLayout from '../components/PageLayout';
import { Download, TrendingUp } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { stats } from '../data/mockData';

export default function Sales() {
  return (
    <PageLayout 
      title="Station Sales" 
      description="Track and analyze station revenue and transactions"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          title="Today's Revenue" 
          value="$12,450" 
          change="+15%" 
          icon={TrendingUp} 
          trend="up" 
        />
        <MetricCard 
          title="Fuel Dispensed" 
          value="8,540 L" 
          change="+5%" 
          icon={TrendingUp} 
          trend="up" 
        />
        <MetricCard 
          title="Avg Transaction" 
          value="$45" 
          change="-2%" 
          icon={TrendingUp} 
          trend="down" 
        />
      </div>

      <div className="glass-card">
        <div className="flex justify-center items-center h-64 text-text-muted flex-col gap-2">
          <p className="font-medium">Recent Sales Table</p>
          <p className="text-sm">Fetching station transactions...</p>
        </div>
      </div>
    </PageLayout>
  );
}
