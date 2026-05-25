import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { AuthService } from '../services/api';
import { changePasswordSchema, updateProfileSchema, validateForm } from '../utils/validation';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

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
    setProfileMsg('');
    setProfileErr('');

    const check = validateForm(updateProfileSchema, { full_name: fullName, email });
    if (!check.success) {
      setProfileErr(check.error);
      return;
    }

    try {
      const res = await AuthService.updateProfile(check.data);
      setProfile(res.data.data);
      localStorage.setItem('userEmail', check.data.email);
      setProfileMsg('Profile updated');
    } catch (err: unknown) {
      setProfileErr(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Update failed'
      );
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');
    setPasswordErr('');

    const check = validateForm(changePasswordSchema, {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (!check.success) {
      setPasswordErr(check.error);
      return;
    }

    try {
      await AuthService.changePassword({
        currentPassword: check.data.currentPassword,
        newPassword: check.data.newPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMsg('Password changed successfully');
    } catch (err: unknown) {
      setPasswordErr(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Password change failed'
      );
    }
  };

  return (
    <PageLayout title="My Profile" description="Manage your account and security settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={saveProfile} className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-lg">Profile</h3>
          <input
            className="glass-input w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            required
            minLength={2}
            maxLength={100}
          />
          <input
            type="email"
            className="glass-input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          {profile && (
            <p className="text-sm text-text-muted">
              Role: <span className="font-bold">{profile.role}</span>
              {profile.status && ` · ${profile.status}`}
            </p>
          )}
          {profileErr && <p className="text-danger text-sm">{profileErr}</p>}
          {profileMsg && <p className="text-primary-500 text-sm">{profileMsg}</p>}
          <button type="submit" className="px-6 py-2.5 bg-primary-500 text-primary-900 font-bold rounded-xl">
            Save profile
          </button>
        </form>

        <form onSubmit={savePassword} className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-lg">Change password</h3>
          <input
            type="password"
            className="glass-input w-full"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            required
            autoComplete="current-password"
          />
          <input
            type="password"
            className="glass-input w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password (min 8 chars, letter + number)"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <input
            type="password"
            className="glass-input w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <p className="text-xs text-text-muted">
            Password must be at least 8 characters and include a letter and a number.
          </p>
          {passwordErr && <p className="text-danger text-sm">{passwordErr}</p>}
          {passwordMsg && <p className="text-primary-500 text-sm">{passwordMsg}</p>}
          <button type="submit" className="px-6 py-2.5 bg-primary-500 text-primary-900 font-bold rounded-xl">
            Update password
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
