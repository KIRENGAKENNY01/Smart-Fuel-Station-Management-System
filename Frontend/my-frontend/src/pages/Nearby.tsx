import PageLayout from '../components/PageLayout';
import { MapPin, Activity, Zap, Droplet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StationService, FuelService } from '../services/api';
import ProCard from '../components/ProCard';
import TransactionDataTable from '../components/TransactionDataTable';
import { fuelTypeLabel } from '../utils/format';
import axios from 'axios';

const GEOAPIFY_API_KEY = "a42cdc1077d542239ac98d3e485a0865";

export default function Nearby() {
  const [nearbyStations, setNearbyStations] = useState<any[]>([]);
  const [allStations, setAllStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddress = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`);
      const properties = response.data.features[0]?.properties || {};
      
      return {
        formatted_address: properties.formatted || "Address unavailable",
        district: properties.city || properties.county || "N/A",
        sector: properties.suburb || properties.district || "N/A"
      };
    } catch (err) {
      return { formatted_address: "Address unavailable", district: "N/A", sector: "N/A" };
    }
  };

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      try {
        const [nearbyRes, allRes] = await Promise.all([
          StationService.getNearby(-1.9441, 30.0619, 5000),
          StationService.getAll()
        ]);

        const enrich = async (data: any[]) => Promise.all(data.map(async (st: any) => {
          const prices = await FuelService.getStationPrices(st.stationId || st._id).then(r => r.data.data).catch(() => []);
          const address = await fetchAddress(st.latitude || st.location?.coordinates[1], st.longitude || st.location?.coordinates[0]);
          return { ...st, prices, addressInfo: address };
        }));

        const [enrichedNearby, enrichedAll] = await Promise.all([
          enrich(nearbyRes.data.data || []),
          enrich(allRes.data.data || [])
        ]);

        setNearbyStations(enrichedNearby);
        setAllStations(enrichedAll);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  const nearbyColumns = [
    { 
      id: 'name', 
      label: 'Station Details',
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3 py-2">
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold">{val}</p>
            <p className="text-[10px] text-[var(--text-secondary)] uppercase font-semibold">
              {typeof row.distance === 'number' ? `${row.distance.toFixed(2)} km away` : 'Near you'}
            </p>
          </div>
        </div>
      )
    },
    { 
      id: 'activeStatus', 
      label: 'Status',
      render: (val: string) => (
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${val === 'ACTIVE' ? 'bg-primary-500 animate-pulse' : 'bg-[var(--text-secondary)]'}`}></span>
          <span className="text-[11px] font-semibold uppercase tracking-wider">{val || 'Active'}</span>
        </div>
      )
    },
    { 
      id: 'addressInfo', 
      label: 'Location Info',
      render: (val: any) => (
        <div className="max-w-[200px]">
          <p className="text-[11px] font-medium leading-tight line-clamp-1">{val?.formatted_address}</p>
          <p className="text-[9px] font-bold text-primary-500 uppercase mt-0.5">{val?.district} • {val?.sector}</p>
        </div>
      )
    },
    { 
      id: 'prices', 
      label: 'Fuel & Pricing',
      render: (prices: any[]) => (
        <div className="flex gap-2">
          {prices && prices.length > 0 ? prices.map((p: any, idx: number) => (
            <div key={idx} className="bg-[var(--surface-base)] border border-[var(--border-base)] rounded-lg px-2 py-1 flex flex-col items-center">
              <span className="text-[8px] font-bold text-[var(--text-secondary)] uppercase">
                {fuelTypeLabel(p.fuelType ?? p.fuel_type ?? p.fuel_type_id ?? p)}
              </span>
              <span className="text-[10px] font-black text-primary-500">{p.pricePerLiter || p.price_per_liter}</span>
            </div>
          )) : <span className="text-[10px] text-text-muted">—</span>}
        </div>
      )
    }
  ];

  const allColumns = [
    { id: 'name', label: 'Station Name' },
    { 
      id: 'addressInfo', 
      label: 'Location',
      render: (val: any) => <span className="text-[12px]">{val?.district}, {val?.sector}</span>
    },
    {
      id: 'prices',
      label: 'Fuel Options',
      render: (prices: any[]) => (
        <div className="flex gap-1 flex-wrap">
          {prices && prices.length > 0 ? prices.map((p: any, idx: number) => (
            <span key={idx} className="text-[9px] font-bold bg-primary-500/10 text-primary-500 px-2 py-0.5 rounded uppercase">
              {fuelTypeLabel(p)}
            </span>
          )) : <span className="text-[10px] text-text-muted">—</span>}
        </div>
      )
    }
  ];

  return (
    <PageLayout title="Discover Stations" description="Find fuel stations around your current location">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <ProCard title="Stations Nearby" value={nearbyStations.length} subtitle="Within 5km radius" icon={MapPin} variant="primary" />
        <ProCard title="Best Price" value="1,600 RWF" subtitle="Petrol - Downtown" icon={Zap} variant="secondary" />
        <ProCard title="Active Network" value={allStations.length} subtitle="City-wide coverage" icon={Activity} variant="accent" />
      </div>

      <div className="space-y-16">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Stations Near You</h3>
            <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest bg-primary-500/10 px-3 py-1 rounded-full">Live Updates</span>
          </div>
          <TransactionDataTable columns={nearbyColumns} data={nearbyStations} loading={loading} />
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">All Network Stations</h3>
          </div>
          <TransactionDataTable columns={allColumns} data={allStations} loading={loading} />
        </section>
      </div>
    </PageLayout>
  );
}



