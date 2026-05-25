import { DollarSign, Droplet, CreditCard, MapPin, Map as MapIcon, TrendingUp, Bell, Activity, Zap, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProCard from '../components/ProCard';
import Sidebar from '../components/Sidebar';
import { stats as mockStats, nearbyStations as mockNearby, staffPerformance as mockStaff } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { FuelService, StationService, TransactionService, NotificationService, ReportService } from '../services/api';
import { formatRwf, formatLiters, fuelTypeLabel } from '../utils/format';

export default function Dashboard() {
  const { role, stationId } = useAuth();
  const [adminStats, setAdminStats] = useState<any>(null);
  const [managerStats, setManagerStats] = useState<any>(null);
  const [managerInventory, setManagerInventory] = useState<any[]>([]);
  const [inventoryPct, setInventoryPct] = useState(0);
  const [nearbyStations, setNearbyStations] = useState(mockNearby);
  const [spentThisMonth, setSpentThisMonth] = useState('0 RWF');
  const [analytics, setAnalytics] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === 'MANAGER') {
          const sid = stationId || localStorage.getItem('stationId');
          if (sid) {
            const invRes = await FuelService.getInventory(sid);
            const invList = invRes.data.data || [];
            setManagerInventory(invList);
            if (invList.length) {
              const avg =
                invList.reduce(
                  (s: number, i: { available_liters: number; max_capacity: number }) =>
                    s + (i.available_liters / (i.max_capacity || 10000)) * 100,
                  0
                ) / invList.length;
              setInventoryPct(Math.round(avg));
            }
            const mRes = await TransactionService.getManagerStats(sid);
            setManagerStats(mRes.data.data);
          }
          const notifRes = await NotificationService.getAll();
          setNotifications(notifRes.data.data || []);
        }

        if (role === 'ADMIN') {
          const statsRes = await TransactionService.getAdminStats('daily');
          setAdminStats(statsRes.data.data);
          const notifRes = await NotificationService.getAll();
          setNotifications(notifRes.data.data || []);
        }

        if (role === 'DRIVER') {
          const stationRes = await StationService.getNearby(-1.9441, 30.0619, 5000);
          if (stationRes.data.data) setNearbyStations(stationRes.data.data);

          const [analyticRes, historyRes] = await Promise.all([
            TransactionService.getAnalytics(),
            TransactionService.getMyHistory({ page: 1, limit: 100 }),
          ]);
          setAnalytics(analyticRes.data.data);
          const meta = historyRes.data.meta;
          const monthSpend = meta?.totalSpent;
          if (monthSpend != null) {
            setSpentThisMonth(formatRwf(monthSpend));
          }

          const notifRes = await NotificationService.getAll();
          setNotifications(notifRes.data.data || []);
        }
      } catch (err) {
        console.warn('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, [role, stationId]);

  const managerFuelSubtitle =
    managerInventory.length > 0
      ? managerInventory
          .map((i: any) => `${fuelTypeLabel(i.fuel_type_id)} ${Number(i.available_liters || 0).toLocaleString()} L`)
          .join(' · ')
      : 'No inventory data';

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-muted">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
              <p className="text-text-muted mt-1">Welcome to XYZ.ltd Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/notifications"
                className="relative p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter((n: { is_read?: boolean }) => !n.is_read).length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full" />
                )}
              </Link>
              {role === 'ADMIN' && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const r = await ReportService.downloadAdmin('daily');
                      const blob = r.data instanceof Blob ? r.data : new Blob([JSON.stringify(r.data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'admin-report.json';
                      a.click();
                      URL.revokeObjectURL(url);
                    } catch {
                      alert('Failed to export report');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              )}
              {(role === 'ADMIN' || role === 'MANAGER') && (
                <Link to="/alerts" className="text-sm font-medium text-primary-500 hover:underline">
                  View alerts
                </Link>
              )}
            </div>
          </header>

          {role === 'ADMIN' && (
            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-black/5 dark:border-white/10 pb-2">
                Admin View (City-Level)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <ProCard
                  title="Total Revenue"
                  value={formatRwf(adminStats?.totalRevenue)}
                  subtitle="Today (daily period)"
                  icon={DollarSign}
                  variant="primary"
                />
                <ProCard
                  title="Fuel Sold"
                  value={formatLiters(adminStats?.totalFuelSold)}
                  subtitle={`${adminStats?.transactionCount || 0} transactions`}
                  icon={Droplet}
                  variant="secondary"
                />
                <ProCard
                  title="Most Active Station"
                  value={
                    adminStats?.mostActiveStation?.stationId
                      ? `#${String(adminStats.mostActiveStation.stationId).slice(-6)}`
                      : 'N/A'
                  }
                  subtitle={
                    adminStats?.mostActiveStation
                      ? formatRwf(adminStats.mostActiveStation.revenue)
                      : 'No data'
                  }
                  icon={MapPin}
                  variant="accent"
                />
              </div>
            </section>
          )}

          {role === 'MANAGER' && (
            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-black/5 dark:border-white/10 pb-2">
                Manager View (Station-Level)
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <ProCard
                  title="Today's Revenue"
                  value={formatRwf(managerStats?.todayRevenue)}
                  subtitle={`${managerStats?.todayTransactions || 0} sales today`}
                  icon={DollarSign}
                  variant="primary"
                />
                <ProCard
                  title="Fuel Inventory"
                  value={`${inventoryPct}%`}
                  subtitle={managerFuelSubtitle}
                  icon={Droplet}
                  variant="danger"
                >
                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 mt-4">
                    <div
                      className="bg-danger h-3 rounded-full"
                      style={{ width: `${Math.min(inventoryPct, 100)}%` }}
                    />
                  </div>
                  <Link
                    to="/inventory"
                    className="block w-full mt-6 py-2 text-center bg-white/10 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    Request Refill
                  </Link>
                </ProCard>
              </div>
            </section>
          )}

          {role === 'DRIVER' && (
            <section className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-black/5 dark:border-white/10 pb-2">
                Driver Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <ProCard
                  title="Spent This Month"
                  value={spentThisMonth}
                  subtitle="Completed purchases"
                  icon={CreditCard}
                  variant="primary"
                >
                  <Link
                    to="/purchase"
                    className="block w-full mt-4 py-3 text-center bg-primary-500 text-primary-900 font-bold rounded-xl"
                  >
                    Purchase Fuel
                  </Link>
                </ProCard>

                <ProCard
                  title="Total Consumption"
                  value={formatLiters(analytics?.totalLiters)}
                  subtitle={`Avg: ${formatRwf(analytics?.averagePrice)}/L`}
                  icon={Activity}
                  variant="secondary"
                />

                <ProCard
                  title="Most Used Fuel"
                  value={analytics?.mostUsedFuelType ? fuelTypeLabel(analytics.mostUsedFuelType) : 'N/A'}
                  subtitle="Preferred choice"
                  icon={Zap}
                  variant="accent"
                />

                <div className="glass-card xl:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg">Nearby Stations</h3>
                    <MapPin className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {nearbyStations.slice(0, 3).map((station: any) => (
                      <div
                        key={station.id || station._id || station.stationId}
                        className="flex justify-between items-center p-4 bg-black/5 dark:bg-white/5 rounded-2xl"
                      >
                        <div>
                          <p className="font-bold">{station.name}</p>
                          <p className="text-xs text-text-muted">
                            {typeof station.distance === 'number'
                              ? `${station.distance.toFixed(2)} km`
                              : 'Near you'}
                          </p>
                        </div>
                        <p className="font-black text-primary-500">
                          {station.fuels?.[0]?.pricePerLiter
                            ? `${station.fuels[0].pricePerLiter} RWF/L`
                            : '—'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="h-8" />
        </div>
      </main>
    </div>
  );
}
