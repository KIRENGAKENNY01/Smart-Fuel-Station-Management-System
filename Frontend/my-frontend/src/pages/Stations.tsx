import PageLayout from '../components/PageLayout';
import { MapPin, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StationService, AuthService } from '../services/api';
import TransactionDataTable from '../components/TransactionDataTable';
import { stationSchema, validateForm } from '../utils/validation';

export default function Stations() {
  const [stations, setStations] = useState<any[]>([]);
  const [managers, setManagers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', latitude: '', longitude: '', manager_id: '' });

  const load = () => {
    setLoading(true);
    Promise.all([StationService.getAll(), AuthService.listUsers()])
      .then(([s, u]) => {
        setStations(s.data.data || []);
        setManagers((u.data.data || []).filter((x: { role: string }) => x.role === 'MANAGER'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = stations.filter((s) => s.name?.toLowerCase().includes(search.toLowerCase()));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateForm(stationSchema, form);
    if (!check.success) {
      alert(check.error);
      return;
    }
    const { manager_id, ...stationData } = check.data;
    try {
      if (editing) {
        await StationService.update(editing._id, stationData);
        if (manager_id) await StationService.assignManager(editing._id, manager_id);
      } else {
        const created = await StationService.create(stationData);
        const newId = created.data.data?._id || created.data._id;
        if (manager_id && newId) await StationService.assignManager(newId, manager_id);
      }
      setShowForm(false);
      setEditing(null);
      load();
    } catch (err: unknown) {
      alert((err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed');
    }
  };

  const columns = [
    { id: 'name', label: 'Station', render: (v: string) => <span className="font-bold">{v}</span> },
    { id: 'status', label: 'Status', render: (v: string) => <span className="text-xs font-bold uppercase">{v || 'ACTIVE'}</span> },
    {
      id: 'location',
      label: 'Coordinates',
      render: (_: unknown, row: { latitude?: number; longitude?: number }) => (
        <span className="font-mono text-xs opacity-70">
          {row.latitude?.toFixed(4)}, {row.longitude?.toFixed(4)}
        </span>
      ),
    },
    {
      id: '_id',
      label: 'Actions',
      render: (id: string, row: any) => (
        <div className="flex gap-2">
          <button type="button" className="text-primary-500 text-xs font-bold" onClick={() => { setEditing(row); setForm({ name: row.name, latitude: String(row.latitude), longitude: String(row.longitude), manager_id: row.manager_id || '' }); setShowForm(true); }}>Edit</button>
          <button type="button" className="text-danger text-xs font-bold" onClick={async () => { if (confirm('Delete station?')) { await StationService.remove(id); load(); } }}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout
      title="Fuel Station Management"
      description="Register stations, update info, assign managers"
      actions={
        <button type="button" onClick={() => { setEditing(null); setForm({ name: '', latitude: '-1.9441', longitude: '30.0619', manager_id: '' }); setShowForm(true); }} className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-primary-900 font-black rounded-2xl">
          <Plus className="w-4 h-4" /> Add Station
        </button>
      }
    >
      {showForm && (
        <form onSubmit={submit} className="glass-card p-6 mb-8 grid md:grid-cols-2 gap-4">
          <input className="glass-input" placeholder="Station name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <select className="glass-input" value={form.manager_id} onChange={(e) => setForm({ ...form, manager_id: e.target.value })}>
            <option value="">No manager assigned (assign later)</option>
            {managers.map((m) => <option key={m._id} value={m._id}>{m.full_name}</option>)}
          </select>
          <input className="glass-input" placeholder="Latitude" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} required />
          <input className="glass-input" placeholder="Longitude" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} required />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="px-6 py-2 bg-primary-500 text-primary-900 font-bold rounded-lg">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg">Cancel</button>
          </div>
        </form>
      )}
      <input className="glass-input max-w-sm mb-6" placeholder="Search stations…" value={search} onChange={(e) => setSearch(e.target.value)} />
      <TransactionDataTable columns={columns} data={filtered} loading={loading} />
    </PageLayout>
  );
}
