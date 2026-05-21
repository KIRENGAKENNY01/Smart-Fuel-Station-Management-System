import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthService } from '../services/api';

type Role = 'ADMIN' | 'MANAGER' | 'DRIVER';

interface AuthContextType {
  role: Role | null;
  stationId: string | null;
  isAuthenticated: boolean;
  setRole: (role: Role) => void;
  setStationId: (id: string | null) => void;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readStoredRole(): Role | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const stored = localStorage.getItem('role') as Role | null;
  if (stored === 'ADMIN' || stored === 'MANAGER' || stored === 'DRIVER') return stored;
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [role, setRoleState] = useState<Role | null>(readStoredRole);
  const [stationId, setStationIdState] = useState<string | null>(() => {
    if (!localStorage.getItem('token')) return null;
    return localStorage.getItem('stationId');
  });

  const setStationId = useCallback((id: string | null) => {
    setStationIdState(id);
    if (id) localStorage.setItem('stationId', id);
    else localStorage.removeItem('stationId');
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('stationId');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setRoleState(null);
    setStationIdState(null);
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      const hasToken = !!localStorage.getItem('token');
      setIsAuthenticated(hasToken);
      if (!hasToken) {
        setRoleState(null);
        setStationIdState(null);
      }
    };
    window.addEventListener('storage', syncAuth);
    window.addEventListener('auth-logout', syncAuth);
    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('auth-logout', syncAuth);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (role) {
      setIsAuthenticated(true);
      return;
    }

    AuthService.getProfile()
      .then((res) => {
        const u = res.data.data;
        if (u?.role) {
          setRoleState(u.role);
          localStorage.setItem('role', u.role);
        }
        if (u?.station_id) {
          const sid = String(u.station_id);
          setStationIdState(sid);
          localStorage.setItem('stationId', sid);
        }
        setIsAuthenticated(true);
      })
      .catch(() => clearSession());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        role,
        stationId,
        isAuthenticated,
        setRole: (r) => {
          setRoleState(r);
          localStorage.setItem('role', r);
          setIsAuthenticated(true);
        },
        setStationId,
        clearSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
