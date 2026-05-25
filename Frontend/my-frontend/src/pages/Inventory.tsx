import PageLayout from '../components/PageLayout';
import { Droplet, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FuelService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { fuelTypeLabel } from '../utils/format';
import { fuelSupplySchema, fuelPriceUpdateSchema, validateForm } from '../utils/validation';

export default function Inventory() {
  const { stationId } = useAuth();
  const sid = stationId || localStorage.getItem('stationId') || '';
  const [items, setItems] = useState<any[]>([]);
  const [supplyForm, setSupplyForm] = useState({ fuel_type_id: '', liters_added: '' });
  const [priceForm, setPriceForm] = useState({ fuel_type_id: '', price: '' });
  const [formError, setFormError] = useState('');

  const load = async () => {
    if (!sid) return;
    const res = await FuelService.getInventory(sid);
    setItems(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, [sid]);

  const addStock = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const check = validateForm(fuelSupplySchema, supplyForm);
    if (!check.success) {
      setFormError(check.error);
      return;
    }
    try {
      await FuelService.addSupply({
        station_id: sid,
        fuel_type_id: check.data.fuel_type_id,
        liters_added: check.data.liters_added,
      });
      setSupplyForm({ fuel_type_id: '', liters_added: '' });
      load();
    } catch (err: unknown) {
      setFormError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Failed to add stock'
      );
    }
  };

  const updatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const check = validateForm(fuelPriceUpdateSchema, priceForm);
    if (!check.success) {
      setFormError(check.error);
      return;
    }
    try {
      await FuelService.updatePrice({
        station_id: sid,
        fuel_type_id: check.data.fuel_type_id,
        price: check.data.price,
      });
      load();
    } catch (err: unknown) {
      setFormError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Failed to update price'
      );
    }
  };

  return (
    <PageLayout title="Fuel Inventory" description="Add stock and update prices">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {items.map((inv: any) => {
          const pct = inv.max_capacity
            ? Math.round((inv.available_liters / inv.max_capacity) * 100)
            : 50;
          const low = inv.available_liters < (inv.low_stock_threshold || 500);
          return (
            <div key={inv._id} className={`glass-card p-6 ${low ? 'border-danger/30' : ''}`}>
              <div className="flex justify-between mb-4">
                <h3 className="font-bold">{fuelTypeLabel(inv.fuel_type_id)}</h3>
                {low ? (
                  <AlertTriangle className="w-5 h-5 text-danger" />
                ) : (
                  <Droplet className="w-5 h-5 text-primary-500" />
                )}
              </div>
              <p className="text-3xl font-black">{inv.available_liters?.toLocaleString()} L</p>
              <p className="text-sm text-text-muted mt-1">
                {inv.price_per_liter?.toLocaleString()} RWF/L · {pct}% capacity
              </p>
              <div className="w-full h-2 bg-black/10 rounded-full mt-4">
                <div
                  className={`h-2 rounded-full ${low ? 'bg-danger' : 'bg-primary-500'}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {formError && <p className="text-danger text-sm mb-4">{formError}</p>}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
        <form onSubmit={addStock} className="glass-card p-6 space-y-3">
          <h4 className="font-bold">Add fuel stock</h4>
          <select
            className="glass-input w-full"
            value={supplyForm.fuel_type_id}
            onChange={(e) => setSupplyForm({ ...supplyForm, fuel_type_id: e.target.value })}
            required
          >
            <option value="">Fuel type</option>
            {items.map((i) => (
              <option key={i._id} value={i.fuel_type_id?._id || i.fuel_type_id}>
                {fuelTypeLabel(i.fuel_type_id)}
              </option>
            ))}
          </select>
          <input
            className="glass-input w-full"
            type="number"
            placeholder="Liters to add"
            value={supplyForm.liters_added}
            onChange={(e) => setSupplyForm({ ...supplyForm, liters_added: e.target.value })}
            required
          />
          <button type="submit" className="w-full py-2 bg-primary-500 text-primary-900 font-bold rounded-lg">
            Add supply
          </button>
        </form>
        <form onSubmit={updatePrice} className="glass-card p-6 space-y-3">
          <h4 className="font-bold">Update price</h4>
          <select
            className="glass-input w-full"
            value={priceForm.fuel_type_id}
            onChange={(e) => setPriceForm({ ...priceForm, fuel_type_id: e.target.value })}
            required
          >
            <option value="">Fuel type</option>
            {items.map((i) => (
              <option key={i._id} value={i.fuel_type_id?._id || i.fuel_type_id}>
                {fuelTypeLabel(i.fuel_type_id)}
              </option>
            ))}
          </select>
          <input
            className="glass-input w-full"
            type="number"
            placeholder="RWF per liter"
            value={priceForm.price}
            onChange={(e) => setPriceForm({ ...priceForm, price: e.target.value })}
            required
          />
          <button type="submit" className="w-full py-2 border font-bold rounded-lg">
            Update price
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
