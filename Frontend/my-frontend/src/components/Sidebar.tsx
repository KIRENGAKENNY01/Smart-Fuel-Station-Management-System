import { Home, Users, Map, Settings, Menu, CreditCard, Droplets, MapPin, LogOut } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../services/api';

const roleLinks = {
  ADMIN: [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Stations', path: '/stations', icon: Map },
    { name: 'System Staff', path: '/staff', icon: Users },
    { name: 'All Transactions', path: '/transactions', icon: CreditCard },
  ],
  MANAGER: [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Inventory', path: '/inventory', icon: Droplets },
    { name: 'Station Staff', path: '/staff', icon: Users },
    { name: 'Station Sales', path: '/sales', icon: CreditCard },
  ],
  DRIVER: [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Nearby Stations', path: '/nearby', icon: MapPin },
    { name: 'My History', path: '/history', icon: CreditCard },
  ]
};

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { role } = useAuth();

  // If role isn't loaded yet or logged out, maybe default to DRIVER or empty
  const links = roleLinks[role] || [];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass-card"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        "glass-sidebar fixed inset-y-0 left-0 z-40 w-60 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative flex flex-col",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3 border-b border-black/5 dark:border-white/10">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center font-bold text-primary-900">
            Q
          </div>
          <h1 className="font-bold text-lg tracking-tight">Qiespend</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map((link, i) => (
            <NavLink 
              key={i} 
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-primary-500/20 text-primary-900 dark:text-primary-500" : "hover:bg-white/10 dark:hover:bg-white/5"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-black/5 dark:border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Theme</div>
            <ThemeSwitch />
          </div>
          <button 
            onClick={async () => {
              try {
                await AuthService.logout();
              } catch (e) {
                console.error(e);
              } finally {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }
            }}
            className="flex items-center justify-center gap-2 w-full py-2 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
