import PageLayout from '../components/PageLayout';
import { MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StationService } from '../services/api';

export default function Stations() {
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StationService.getAll()
      .then(res => {
        console.log("✅ [Stations] Fetched all stations successfully:", res.data);
        setStations(res.data.data || []);
      })
      .catch(err => {
        console.error("❌ [Stations] Error fetching stations:", err.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout title="Stations" description="Manage all fuel stations in the network">
      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Search className="w-5 h-5" />
          </div>
          <input type="text" className="glass-input w-full pl-10" placeholder="Search stations..." />
        </div>
        <button className="px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg">Add Station</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-text-muted col-span-3">Loading stations...</p>
        ) : stations.length === 0 ? (
          <p className="text-text-muted col-span-3">No stations registered yet.</p>
        ) : (
          stations.map((station: any) => (
            <div key={station._id} className="glass-card flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary-500/10 text-primary-900 dark:text-primary-500 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="px-2 py-1 bg-primary-500/20 text-primary-900 dark:text-primary-500 rounded text-xs font-medium">Active</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{station.name}</h3>
                <p className="text-text-muted text-sm mt-1">Location: {station.location?.coordinates?.join(', ') || 'Kigali, Rwanda'}</p>
              </div>
              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between">
                <button className="text-sm font-medium text-primary-500 hover:text-primary-600">View Details</button>
                <button className="text-sm font-medium text-primary-500 hover:text-primary-600">Edit</button>
              </div>
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
}
