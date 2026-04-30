import PageLayout from '../components/PageLayout';
import { Droplet, AlertTriangle } from 'lucide-react';
import { stats } from '../data/mockData';

export default function Inventory() {
  const inventoryLevel = stats.manager.inventory;

  return (
    <PageLayout title="Fuel Inventory" description="Real-time monitoring of station fuel levels">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Main Underground Tank</h3>
            <div className="p-2 bg-primary-500/10 text-primary-900 dark:text-primary-500 rounded-lg"><Droplet className="w-5 h-5" /></div>
          </div>
          
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 rounded-full border-4 border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden bg-white/50 dark:bg-black/20">
              {/* Fake liquid level */}
              <div 
                className="absolute bottom-0 w-full bg-primary-500/80 transition-all duration-1000 ease-in-out" 
                style={{ height: `${inventoryLevel}%` }}
              ></div>
              <div className="relative z-10 text-center">
                <span className="text-4xl font-bold">{inventoryLevel}%</span>
                <p className="text-sm font-medium mt-1">Full</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Capacity</span>
              <span className="font-medium">50,000 L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Current Volume</span>
              <span className="font-medium">{50000 * (inventoryLevel / 100)} L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Status</span>
              <span className="text-primary-500 font-medium">Optimal</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            Request Delivery
          </button>
        </div>

        <div className="glass-card border-danger/20 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Reserve Tank</h3>
            <div className="p-2 bg-danger/10 text-danger rounded-lg"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 rounded-full border-4 border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden bg-white/50 dark:bg-black/20">
              <div className="absolute bottom-0 w-full bg-danger/80 transition-all duration-1000" style={{ height: '15%' }}></div>
              <div className="relative z-10 text-center">
                <span className="text-4xl font-bold text-danger">15%</span>
                <p className="text-sm font-medium mt-1">Critical</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-auto py-3 bg-danger text-white font-medium rounded-lg hover:bg-danger/90 transition-colors">
            Emergency Refill
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
