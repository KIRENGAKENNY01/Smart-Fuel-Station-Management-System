import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { AuthService } from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    AuthService.getProfile().then((res) => {
      const u = res.data.data;
      setProfile(u);
      setFullName(u.full_name || '');
      setEmail(u.email || '');
    });
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setErr('');
    try {
      const res = await AuthService.updateProfile({ full_name: fullName, email });
      setProfile(res.data.data);
      localStorage.setItem('userEmail', email);
      setMsg('Profile updated');
    } catch (e: unknown) {
      setErr((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Update failed');
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setErr('');
    try {
      await AuthService.changePassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setMsg('Password changed');
    } catch (e: unknown) {
      setErr((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Password change failed');
    }
  };

  return (
    <PageLayout title="My Profile" description="Manage your account and security settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={saveProfile} className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-lg">Profile</h3>
          <input
            className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
          />
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {profile && (
            <p className="text-sm text-text-muted">
              Role: <span className="font-bold">{profile.role}</span>
              {profile.status && ` · ${profile.status}`}
            </p>
          )}
          <button type="submit" className="px-6 py-2.5 bg-primary-500 text-primary-900 font-bold rounded-xl">
            Save profile
          </button>
        </form>

        <form onSubmit={savePassword} className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-lg">Change password</h3>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
          />
          <button type="submit" className="px-6 py-2.5 bg-primary-500 text-primary-900 font-bold rounded-xl">
            Update password
          </button>
        </form>
      </div>
      {msg && <p className="text-primary-500 mt-4">{msg}</p>}
      {err && <p className="text-danger mt-4">{err}</p>}
    </PageLayout>
  );
}
