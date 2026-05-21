import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, Fuel } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { FuelService, StationService, TransactionService } from '../services/api';

type FuelOption = {
  fuelTypeId: string;
  fuelType: string;
  pricePerLiter: number;
  availableLiters: number;
};

type StationOption = {
  _id?: string;
  id?: string;
  stationId?: string;
  name: string;
};

export default function Purchase() {
  const navigate = useNavigate();
  const [stations, setStations] = useState<StationOption[]>([]);
  const [fuelOptions, setFuelOptions] = useState<FuelOption[]>([]);
  const [stationId, setStationId] = useState('');
  const [fuelTypeId, setFuelTypeId] = useState('');
  const [liters, setLiters] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadStations = async () => {
      setLoading(true);
      try {
        const res = await StationService.getNearby(-1.9441, 30.0619, 10000);
        const list = res.data.data || [];
        setStations(list);
        if (list.length > 0) {
          const firstId = list[0].stationId || list[0]._id || list[0].id;
          setStationId(String(firstId));
        }
      } catch {
        setError('Could not load stations. Try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadStations();
  }, []);

  useEffect(() => {
    if (!stationId) return;
    const loadPrices = async () => {
      try {
        const res = await FuelService.getStationPrices(stationId);
        const options = (res.data.data || []) as FuelOption[];
        setFuelOptions(options);
        if (options.length > 0) {
          setFuelTypeId(String(options[0].fuelTypeId));
        } else {
          setFuelTypeId('');
        }
      } catch {
        setFuelOptions([]);
        setFuelTypeId('');
      }
    };
    loadPrices();
  }, [stationId]);

  const selectedFuel = fuelOptions.find((f) => String(f.fuelTypeId) === fuelTypeId);
  const quantity = parseFloat(liters) || 0;
  const estimatedTotal = selectedFuel ? quantity * selectedFuel.pricePerLiter : 0;

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!stationId || !fuelTypeId || !quantity || quantity <= 0) {
      setError('Select a station, fuel type, and enter a valid quantity.');
      return;
    }
    if (selectedFuel && quantity > selectedFuel.availableLiters) {
      setError(`Only ${selectedFuel.availableLiters}L available at this station.`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await TransactionService.create({
        stationId,
        fuelType: fuelTypeId,
        liters: quantity,
      });
      const tx = res.data.data;
      setSuccess(
        `Payment submitted (${tx?.status || 'PENDING'}). ${quantity}L — ${tx?.totalAmount?.toLocaleString() ?? estimatedTotal.toLocaleString()} RWF. Awaiting manager confirmation.`
      );
      setLiters('');
      setTimeout(() => navigate('/history'), 2000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Purchase failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Fuel Purchase"
      description="Select fuel type, enter quantity, and complete your purchase"
    >
      <form onSubmit={handlePurchase} className="max-w-xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary-500" /> Station
            </span>
            <select
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              disabled={loading || stations.length === 0}
              className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
            >
              {stations.map((s) => {
                const id = String(s.stationId || s._id || s.id);
                return (
                  <option key={id} value={id}>
                    {s.name}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold flex items-center gap-2 mb-2">
              <Fuel className="w-4 h-4 text-primary-500" /> Fuel type
            </span>
            <select
              value={fuelTypeId}
              onChange={(e) => setFuelTypeId(e.target.value)}
              disabled={fuelOptions.length === 0}
              className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
            >
              {fuelOptions.map((f) => (
                <option key={String(f.fuelTypeId)} value={String(f.fuelTypeId)}>
                  {f.fuelType} — {f.pricePerLiter.toLocaleString()} RWF/L
                  {f.availableLiters != null ? ` (${f.availableLiters}L available)` : ''}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold flex items-center gap-2 mb-2">
              <Droplet className="w-4 h-4 text-primary-500" /> Quantity (liters)
            </span>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
              placeholder="e.g. 25"
              className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
            />
          </label>

          {quantity > 0 && selectedFuel && (
            <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
              <p className="text-sm text-text-muted">Estimated total</p>
              <p className="text-2xl font-black text-primary-500">
                {estimatedTotal.toLocaleString()} RWF
              </p>
            </div>
          )}
        </div>

        {error && <p className="text-danger text-sm font-medium">{error}</p>}
        {success && <p className="text-primary-500 text-sm font-medium">{success}</p>}

        <button
          type="submit"
          disabled={submitting || loading}
          className="w-full py-4 bg-primary-500 text-primary-900 font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {submitting ? 'Processing payment…' : 'Purchase fuel'}
        </button>
      </form>
    </PageLayout>
  );
}
