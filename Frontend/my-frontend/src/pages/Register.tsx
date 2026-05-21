import { useEffect, useState } from 'react';
import { Mail, Lock, User, Briefcase, ArrowRight, MapPin, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService, StationService } from '../services/api';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleState] = useState('DRIVER');
  const [stationId, setStationId] = useState('');
  const [applicationMessage, setApplicationMessage] = useState('');
  const [stations, setStations] = useState<{ _id: string; name: string }[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'MANAGER') {
      StationService.getAll()
        .then((res) => setStations(res.data.data || []))
        .catch(() => setStations([]));
    }
  }, [role]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload: Record<string, string> = {
        full_name: fullName,
        email,
        password,
        role,
      };
      if (role === 'MANAGER') {
        if (!stationId) {
          setError('Please select the station you will manage');
          setLoading(false);
          return;
        }
        payload.station_id = stationId;
        if (applicationMessage.trim()) payload.application_message = applicationMessage.trim();
      }

      const res = await AuthService.signup(payload);
      const msg = res.data.message || 'Registration complete';
      setSuccess(msg);

      if (res.data.requiresApproval) {
        setTimeout(() => navigate('/login'), 4000);
      } else {
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-8 left-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center font-bold text-primary-900">
            Q
          </div>
          <h1 className="font-bold text-lg tracking-tight">XYZ.ltd</h1>
        </div>
      </div>

      <div className="glass-card w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-text-muted mt-2">Join the smart fuel station network</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-danger/10 text-danger border border-danger/20 rounded-lg text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-3 bg-primary-500/10 text-primary-900 dark:text-primary-500 border border-primary-500/20 rounded-lg text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="glass-input w-full pl-10"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full pl-10"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">I am registering as</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <Briefcase className="w-5 h-5" />
              </div>
              <select
                value={role}
                onChange={(e) => {
                  setRoleState(e.target.value);
                  setStationId('');
                }}
                className="glass-input w-full pl-10"
              >
                <option value="DRIVER">Driver</option>
                <option value="MANAGER">Station Manager (requires admin approval)</option>
              </select>
            </div>
          </div>

          {role === 'MANAGER' && (
            <>
              <div className="p-3 rounded-lg bg-chart-highlight/10 border border-chart-highlight/20 text-xs text-text-muted">
                Station managers must choose a station and wait for an admin to approve the application before signing in.
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Station to manage</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <select
                    required
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    className="glass-input w-full pl-10"
                  >
                    <option value="">Select a fuel station</option>
                    {stations.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Application note (optional)</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none text-text-muted">
                    <FileText className="w-5 h-5" />
                  </div>
                  <textarea
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    className="glass-input w-full pl-10 min-h-[80px]"
                    placeholder="Brief experience or reason for managing this station…"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-primary-500 hover:bg-primary-600 text-primary-900 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading
              ? 'Submitting…'
              : role === 'MANAGER'
                ? 'Submit application'
                : 'Create account'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
