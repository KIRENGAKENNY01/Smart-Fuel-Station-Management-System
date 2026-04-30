import { ReactNode } from 'react';
import Sidebar from './Sidebar';

export default function PageLayout({ title, description, children, actions }: { title: string, description: string, children: ReactNode, actions?: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-black/5 dark:border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-text-muted mt-1">{description}</p>
            </div>
            {actions && <div>{actions}</div>}
          </header>
          {children}
          <div className="h-8"></div>
        </div>
      </main>
    </div>
  );
}
