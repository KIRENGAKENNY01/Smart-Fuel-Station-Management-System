import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { AuthService, StationService } from '../services/api';
import { UserPlus } from 'lucide-react';

export default function Staff() {
  const [users, setUsers] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [stations, setStations] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'MANAGER',
  });

  const load = async () => {
    const [u, p, s] = await Promise.all([
      AuthService.listUsers(),
      AuthService.getPendingManagers(),
      StationService.getAll(),
    ]);
    setUsers(u.data.data || []);
    setPending(p.data.data || []);
    setStations(s.data.data || []);
  };

  const stationName = (id: string) => stations.find((s: any) => s._id === id)?.name || id?.slice?.(-6) || 'Unknown';

  const handleApprove = async (userId: string, requestedStationId: string) => {
    try {
      await AuthService.approveManager(userId, requestedStationId);
      load();
    } catch (err: unknown) {
      alert((err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Approval failed');
    }
  };

  const handleReject = async (userId: string) => {
    const reason = prompt('Rejection reason (optional):');
    if (reason === null) return;
    try {
      await AuthService.rejectManager(userId, reason || undefined);
      load();
    } catch (err: unknown) {
      alert((err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Rejection failed');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm({ full_name: '', email: '', password: '', role: 'MANAGER' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await AuthService.updateUser(editing._id, {
          full_name: form.full_name,
          email: form.email,
          role: form.role,
          ...(form.password ? { password: form.password } : {}),
        });
      } else {
        // Generate a temporary password if none provided
        const password = form.password || `Temp@${Math.random().toString(36).slice(-8)}1`;
        await AuthService.createUser({
          full_name: form.full_name,
          email: form.email,
          password,
          role: form.role,
        });
      }
      resetForm();
      load();
    } catch (err: unknown) {
      alert((err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed');
    }
  };

  return (
    <PageLayout
      title="User Management"
      description="Create users, assign roles and stations, suspend accounts"
      actions={
        <button
          type="button"
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg"
        >
          <UserPlus className="w-4 h-4" /> Create user
        </button>
      }
    >
      {pending.length > 0 && (
        <section className="glass-card p-6 mb-8 border border-chart-highlight/30">
          <h3 className="font-bold text-lg mb-4">Pending manager applications</h3>
          <div className="space-y-4">
            {pending.map((app) => (
              <div key={app._id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5">
                <div>
                  <p className="font-bold">{app.full_name}</p>
                  <p className="text-sm text-text-muted">{app.email}</p>
                  <p className="text-sm mt-1">
                    Requested station: <span className="font-semibold text-primary-500">{stationName(app.station_id)}</span>
                  </p>
                  {app.application_message && (
                    <p className="text-xs text-text-muted mt-2 italic">&ldquo;{app.application_message}&rdquo;</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleApprove(app._id, app.station_id)}
                    className="px-4 py-2 bg-primary-500 text-primary-900 font-bold rounded-lg text-sm"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(app._id)}
                    className="px-4 py-2 border border-danger/30 text-danger font-bold rounded-lg text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <h3 className="md:col-span-2 font-bold text-lg">{editing ? 'Edit User' : 'Create User'}</h3>
          <input className="glass-input" placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
          <input className="glass-input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <select className="glass-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="MANAGER">Station Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
          <input
            className="glass-input"
            type="password"
            placeholder={editing ? 'New password (leave blank to keep current)' : 'Temporary password (optional — auto-generated if blank)'}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="px-6 py-2 bg-primary-500 text-primary-900 font-bold rounded-lg">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={resetForm} className="px-6 py-2 border rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-text-muted border-b border-black/10">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-black/5">
                <td className="p-3 font-medium">{u.full_name}</td>
                <td className="p-3 text-text-muted">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    u.status === 'SUSPENDED' || u.status === 'REJECTED' ? 'bg-danger/20 text-danger' :
                    u.status === 'PENDING_APPROVAL' ? 'bg-chart-highlight/20 text-chart-highlight' :
                    'bg-primary-500/20 text-primary-500'
                  }`}>
                    {u.status || 'ACTIVE'}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button type="button" className="text-primary-500 font-medium" onClick={() => { setEditing(u); setForm({ full_name: u.full_name, email: u.email, password: '', role: u.role }); setShowForm(true); }}>Edit</button>
                  {u.status !== 'SUSPENDED' && (
                    <button type="button" className="text-danger font-medium" onClick={async () => { await AuthService.suspendUser(u._id); load(); }}>Suspend</button>
                  )}
                  {u.status === 'SUSPENDED' && (
                    <button type="button" className="text-chart-highlight font-medium" onClick={async () => { await AuthService.unsuspendUser(u._id); load(); }}>Unsuspend</button>
                  )}
                  <button type="button" className="text-text-muted" onClick={async () => { if (confirm('Delete user?')) { await AuthService.deleteUser(u._id); load(); } }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
