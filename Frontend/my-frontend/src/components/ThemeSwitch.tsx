import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [theme, setTheme] = useState(
    () => typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/40 transition-colors border border-black/5 dark:border-white/10"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-primary-500" /> : <Moon className="w-5 h-5 text-primary-900" />}
    </button>
  );
}
