import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, Fuel } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { FuelService, StationService, TransactionService } from '../services/api';
import { fuelTypeLabel } from '../utils/format';
import { purchaseSchema, validateForm } from '../utils/validation';

type FuelOption = {
  fuelTypeId: string;
  fuelType: string;
  pricePerLiter: number;
  availableLiters: number;
};

type EmbeddedFuel = {
  fuelTypeId?: unknown;
  fuel_type_id?: unknown;
  fuelType?: string;
  fuel_type?: string;
  pricePerLiter?: number;
  price_per_liter?: number;
  availableLiters?: number;
  available_liters?: number;
};

type StationOption = {
  _id?: string;
  id?: string;
  stationId?: string;
  name: string;
  fuels?: EmbeddedFuel[];
};

const toId = (value: unknown): string => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && '_id' in value) {
    return String((value as { _id: unknown })._id);
  }
  return String(value);
};

const normalizeFuelOption = (raw: Record<string, unknown>): FuelOption | null => {
  const fuelTypeId = toId(raw.fuelTypeId ?? raw.fuel_type_id);
  if (!fuelTypeId) return null;
  return {
    fuelTypeId,
    fuelType: fuelTypeLabel(
      (raw.fuelType ?? raw.fuel_type ?? raw.fuelTypes ?? '') as string
    ),
    pricePerLiter: Number(raw.pricePerLiter ?? raw.price_per_liter ?? 0),
    availableLiters: Number(raw.availableLiters ?? raw.available_liters ?? 0),
  };
};

const fuelsFromStation = (station: StationOption | undefined): FuelOption[] => {
  if (!station?.fuels?.length) return [];
  return station.fuels
    .map((f) =>
      normalizeFuelOption({
        fuelTypeId: f.fuelTypeId ?? f.fuel_type_id,
        fuelType: f.fuelType,
        fuel_type: f.fuel_type,
        pricePerLiter: f.pricePerLiter,
        price_per_liter: f.price_per_liter,
        availableLiters: f.availableLiters,
        available_liters: f.available_liters,
      })
    )
    .filter((o): o is FuelOption => o != null);
};

const stationOptionId = (s: StationOption) => toId(s.stationId ?? s._id ?? s.id);

export default function Purchase() {
  const navigate = useNavigate();
  const [stations, setStations] = useState<StationOption[]>([]);
  const [fuelOptions, setFuelOptions] = useState<FuelOption[]>([]);
  const [stationId, setStationId] = useState('');
  const [fuelTypeId, setFuelTypeId] = useState('');
  const [liters, setLiters] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingFuel, setLoadingFuel] = useState(false);
  const [fuelHint, setFuelHint] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const setFuelSelection = (options: FuelOption[]) => {
    setFuelOptions(options);
    setFuelTypeId((prev) => {
      if (prev && options.some((o) => o.fuelTypeId === prev)) return prev;
      return options[0]?.fuelTypeId ?? '';
    });
  };

  useEffect(() => {
    const loadStations = async () => {
      setLoading(true);
      try {
        let list: StationOption[] = [];
        try {
          const nearbyRes = await StationService.getNearby(-1.9441, 30.0619, 10000);
          list = nearbyRes.data.data || [];
        } catch {
          /* fallback below */
        }
        if (list.length === 0) {
          const allRes = await StationService.getAll();
          list = (allRes.data.data || []).map((s: StationOption) => ({
            stationId: stationOptionId(s),
            name: s.name,
            fuels: s.fuels,
          }));
        }
        setStations(list);
        if (list.length > 0) {
          setStationId(stationOptionId(list[0]));
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

    const station = stations.find((s) => stationOptionId(s) === stationId);
    const embedded = fuelsFromStation(station);
    if (embedded.length > 0) {
      setFuelSelection(embedded);
      setFuelHint('');
    }

    let cancelled = false;
    const loadPrices = async () => {
      setLoadingFuel(true);
      setFuelHint('');
      try {
        const res = await FuelService.getStationPrices(stationId);
        if (cancelled) return;
        const rawList = (res.data.data || []) as Record<string, unknown>[];
        const options = rawList
          .map(normalizeFuelOption)
          .filter((o): o is FuelOption => o != null);
        if (options.length > 0) {
          setFuelSelection(options);
          setFuelHint('');
        } else if (embedded.length === 0) {
          setFuelSelection([]);
          setFuelHint('No fuel inventory at this station. Ask a manager to add stock.');
        }
      } catch {
        if (cancelled) return;
        if (embedded.length === 0) {
          setFuelSelection([]);
          setFuelHint('Could not load fuel types. Check you are logged in and try again.');
        }
      } finally {
        if (!cancelled) setLoadingFuel(false);
      }
    };

    loadPrices();
    return () => {
      cancelled = true;
    };
  }, [stationId, stations]);

  const selectedFuel = fuelOptions.find((f) => f.fuelTypeId === fuelTypeId);
  const quantity = parseFloat(liters) || 0;
  const estimatedTotal = selectedFuel ? quantity * selectedFuel.pricePerLiter : 0;
  const fuelSelectDisabled = loadingFuel || !stationId;
  const canPurchase = Boolean(stationId && fuelTypeId && fuelOptions.length > 0);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const check = validateForm(purchaseSchema, {
      stationId,
      fuelTypeId,
      liters: quantity,
    });
    if (!check.success) {
      setError(check.error);
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
          <div className="relative z-10">
            <label htmlFor="purchase-station" className="text-sm font-semibold flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary-500" /> Station
            </label>
            <select
              id="purchase-station"
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              disabled={loading || stations.length === 0}
              className="glass-input glass-select w-full py-3 relative z-10"
            >
              {stations.length === 0 ? (
                <option value="">No stations available</option>
              ) : (
                stations.map((s) => {
                  const id = stationOptionId(s);
                  return (
                    <option key={id} value={id}>
                      {s.name}
                    </option>
                  );
                })
              )}
            </select>
          </div>

          <div className="relative z-10">
            <label htmlFor="purchase-fuel-type" className="text-sm font-semibold flex items-center gap-2 mb-2">
              <Fuel className="w-4 h-4 text-primary-500" /> Fuel type
            </label>
            <select
              id="purchase-fuel-type"
              value={fuelTypeId}
              onChange={(e) => setFuelTypeId(e.target.value)}
              disabled={fuelSelectDisabled}
              className="glass-input glass-select w-full py-3 relative z-10 disabled:opacity-60"
            >
              {loadingFuel && fuelOptions.length === 0 ? (
                <option value="">Loading fuel types…</option>
              ) : fuelOptions.length === 0 ? (
                <option value="">Select a station first</option>
              ) : (
                fuelOptions.map((f) => (
                  <option key={f.fuelTypeId} value={f.fuelTypeId}>
                    {fuelTypeLabel(f.fuelType)} — {f.pricePerLiter.toLocaleString()} RWF/L
                    {f.availableLiters != null ? ` (${f.availableLiters}L available)` : ''}
                  </option>
                ))
              )}
            </select>
            {fuelHint && <p className="text-sm text-danger mt-2">{fuelHint}</p>}
          </div>

          <div className="relative z-10">
            <label htmlFor="purchase-liters" className="text-sm font-semibold flex items-center gap-2 mb-2">
              <Droplet className="w-4 h-4 text-primary-500" /> Quantity (liters)
            </label>
            <input
              id="purchase-liters"
              type="number"
              min="0.1"
              step="0.1"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
              placeholder="e.g. 25"
              className="glass-input w-full py-3"
            />
          </div>

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
          disabled={submitting || loading || !canPurchase}
          className="w-full py-4 bg-primary-500 text-primary-900 font-bold rounded-xl shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {submitting ? 'Processing payment…' : 'Purchase fuel'}
        </button>
      </form>
    </PageLayout>
  );
}
