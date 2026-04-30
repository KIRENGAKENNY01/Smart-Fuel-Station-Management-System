import { DollarSign, Droplet, CreditCard, Download, MapPin, Map as MapIcon, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import MetricCard from '../components/MetricCard';
import Sidebar from '../components/Sidebar';
import { stats as mockStats, nearbyStations as mockNearby, staffPerformance as mockStaff } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { FuelService, StationService, TransactionService } from '../services/api';

export default function Dashboard() {
  const { role } = useAuth();
  
  // State for real API data
  const [inventory, setInventory] = useState(mockStats.manager.inventory);
  const [nearbyStations, setNearbyStations] = useState(mockNearby);
  const [spentThisMonth, setSpentThisMonth] = useState(mockStats.driver.spentThisMonth);
  // Add more states for real data as needed
  
  useEffect(() => {
    // We attempt to fetch real data, but if it fails (e.g. backend offline or missing token), we keep the mock fallback
    
    if (role === 'MANAGER') {
      FuelService.getInventory('1').then(res => {
        console.log("✅ [Dashboard Manager] Fetched inventory:", res.data);
        const invData = res.data.data;
        if (invData && invData.level) setInventory(invData.level);
      }).catch(err => {
        console.warn('⚠️ [Dashboard Manager] Using mock data for inventory:', err.response?.data || err.message);
      });
    }
    
    if (role === 'DRIVER') {
      StationService.getNearby(-1.9441, 30.0619, 5000).then(res => {
        console.log("✅ [Dashboard Driver] Fetched nearby stations:", res.data);
        const stationList = res.data.data;
        if (stationList && stationList.length > 0) setNearbyStations(stationList);
      }).catch(err => {
        console.warn('⚠️ [Dashboard Driver] Using mock data for nearby stations:', err.response?.data || err.message);
      });
      
      TransactionService.getMyHistory().then(res => {
        console.log("✅ [Dashboard Driver] Fetched my history:", res.data);
        const history = res.data.data;
        if (history && Array.isArray(history)) {
          const total = history.reduce((sum, tx) => sum + (tx.amount || 0), 0);
          setSpentThisMonth(`$${total}`);
        }
      }).catch(err => {
        console.warn('⚠️ [Dashboard Driver] Using mock data for history:', err.response?.data || err.message);
      });
    }
  }, [role]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
              <p className="text-text-muted mt-1">Welcome to Qiespend Dashboard</p>
            </div>
            {role === 'ADMIN' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg hover:bg-primary-600 transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            )}
          </header>

          {/* Admin View */}
          {role === 'ADMIN' && (
            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-black/5 dark:border-white/10 pb-2">Admin View (City-Level)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <MetricCard 
                  title="Total Revenue" 
                  value={mockStats.admin.totalRevenue} 
                  change={mockStats.admin.revenueChange} 
                  icon={DollarSign} 
                  trend="up" 
                />
                <div className="glass-card xl:col-span-2 flex flex-col justify-center items-center h-40 min-h-[200px] gap-3">
                  <MapIcon className="w-10 h-10 text-text-muted" />
                  <p className="text-text-muted font-medium">Map view of Kigali stations goes here</p>
                </div>
              </div>
            </section>
          )}

          {/* Manager View */}
          {role === 'MANAGER' && (
            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-black/5 dark:border-white/10 pb-2">Manager View (Station-Level)</h2>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="glass-card xl:col-span-1 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Fuel Inventory</h3>
                    <div className="p-2 bg-danger/10 text-danger rounded-lg"><Droplet className="w-5 h-5" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-text-muted">Current Level</span>
                      <span className="font-bold">{inventory}%</span>
                    </div>
                    <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3">
                      <div className="bg-primary-500 h-3 rounded-full" style={{ width: `${inventory}%` }}></div>
                    </div>
                    <p className="text-xs text-text-muted mt-2">{mockStats.manager.inventoryChange} vs last month</p>
                  </div>
                  <button className="w-full py-3 bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    Request Refill
                  </button>
                </div>
                
                <div className="glass-card xl:col-span-2">
                  <h3 className="font-semibold text-lg mb-6">Staff Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-text-muted text-sm border-b border-black/5 dark:border-white/10">
                          <th className="pb-3 font-medium">Name</th>
                          <th className="pb-3 font-medium">Role</th>
                          <th className="pb-3 font-medium">Sales</th>
                          <th className="pb-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {mockStaff.map((staff, i) => (
                          <tr key={staff.id} className={i % 2 === 0 ? "bg-black/[0.02] dark:bg-white/[0.02]" : ""}>
                            <td className="py-3 font-medium">{staff.name}</td>
                            <td className="py-3 text-text-muted">{staff.role}</td>
                            <td className="py-3">{staff.sales}</td>
                            <td className="py-3">
                              <span className="px-2 py-1 bg-primary-500/20 text-primary-900 dark:text-primary-500 rounded text-xs font-medium">
                                {staff.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Driver View */}
          {role === 'DRIVER' && (
            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-black/5 dark:border-white/10 pb-2">Driver View (User-Level)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                
                <div className="glass-card p-0 overflow-hidden flex flex-col justify-between" style={{ background: 'var(--color-accents-visa_card_gradient, linear-gradient(135deg, #000000 0%, #365314 100%))' }}>
                  <div className="p-6 text-white h-full flex flex-col justify-between min-h-[200px]">
                    <div className="flex justify-between items-start">
                      <CreditCard className="w-8 h-8 text-white/80" />
                      <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">Quick Pay</span>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Spent This Month</p>
                      <p className="text-3xl font-bold">{spentThisMonth}</p>
                      <p className="text-white/60 text-xs mt-2">{mockStats.driver.spentChange} vs last month</p>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-medium backdrop-blur-md transition-colors text-center border-t border-white/10">
                    Pay for Fuel
                  </button>
                </div>

                <div className="glass-card xl:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg">Nearby Stations</h3>
                    <div className="p-2 bg-primary-500/10 text-primary-900 dark:text-primary-500 rounded-lg"><MapPin className="w-5 h-5" /></div>
                  </div>
                  <div className="space-y-4">
                    {nearbyStations.map((station: any) => (
                      <div key={station.id || station._id} className="flex justify-between items-center p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/10 hover:border-primary-500/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-900 dark:text-primary-500">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{station.name}</p>
                            <p className="text-xs text-text-muted">{station.distance || '0 km'} away</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{station.price || '1,450 RWF/L'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="glass-card min-h-[200px] flex flex-col justify-center items-center gap-3">
                 <TrendingUp className="w-10 h-10 text-chart-highlight" />
                 <p className="text-text-muted font-medium">Price Tracking Line Chart Goes Here</p>
              </div>
            </section>
          )}

          {/* Footer margin */}
          <div className="h-8"></div>
        </div>
      </main>
    </div>
  );
}
