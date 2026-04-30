import PageLayout from '../components/PageLayout';
import { MapPin, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StationService, FuelService } from '../services/api';

export default function Nearby() {
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Default Kigali coordinates
    const lat = -1.9441;
    const lng = 30.0619;
    
    StationService.getNearby(lat, lng, 10000)
      .then(async (res) => {
        const stationsData = res.data.data || [];
        console.log(`✅ [Nearby] Fetched ${stationsData.length} nearby stations:`, stationsData);
        
        // Fetch prices for each station
        const stationsWithPrices = await Promise.all(
          stationsData.map(async (st: any) => {
            try {
              const priceRes = await FuelService.getStationPrices(st._id);
              console.log(`✅ [Nearby] Fetched prices for station ${st.name}:`, priceRes.data);
              st.prices = priceRes.data.data || [];
            } catch (err: any) {
              console.warn(`⚠️ [Nearby] Could not fetch prices for station ${st.name}:`, err.response?.data || err.message);
              st.prices = [];
            }
            return st;
          })
        );
        setStations(stationsWithPrices);
      })
      .catch(err => {
        console.error("❌ [Nearby] Error fetching nearby stations:", err.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout title="Nearby Stations" description="Find fuel stations around your current location">
      <div className="glass-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Stations near you</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-text-muted text-sm border-b border-black/5 dark:border-white/10">
                <th className="pb-3 font-medium px-2">Station Name</th>
                <th className="pb-3 font-medium">Distance</th>
                <th className="pb-3 font-medium">Available Fuel & Price</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={4} className="py-8 text-center text-text-muted">Locating nearby stations...</td></tr>
              ) : stations.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-text-muted">No stations found nearby.</td></tr>
              ) : (
                stations.map((station, i) => (
                  <tr key={station._id} className={i % 2 === 0 ? "bg-black/[0.02] dark:bg-white/[0.02]" : ""}>
                    <td className="py-4 font-medium px-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-900 dark:text-primary-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      {station.name}
                    </td>
                    <td className="py-4 text-text-muted">
                      {station.distance ? `${station.distance.toFixed(2)} km` : 'Unknown'}
                    </td>
                    <td className="py-4">
                      {station.prices && station.prices.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {station.prices.map((p: any) => (
                            <span key={p._id} className="text-xs font-medium bg-black/5 dark:bg-white/10 px-2 py-1 rounded inline-block w-fit">
                              {p.fuel_type_id?.name || 'Fuel'}: {p.price_per_liter} RWF
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-text-muted text-xs">No price data</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-500/10 text-primary-900 dark:text-primary-500 hover:bg-primary-500/20 rounded-lg text-xs font-medium transition-colors">
                        <Navigation className="w-3 h-3" />
                        Navigate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
