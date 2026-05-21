import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  chart?: React.ReactNode;
  children?: React.ReactNode;
}

const ProCard: React.FC<ProCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = 'primary',
  chart,
  children
}) => {
  const variants = {
    primary: 'from-primary-500/10 to-primary-600/5 border-primary-500/20',
    secondary: 'from-chart-highlight/10 to-chart-highlight/5 border-chart-highlight/20',
    accent: 'from-chart-fuel/10 to-chart-fuel/5 border-chart-fuel/20',
    danger: 'from-danger/10 to-danger/5 border-danger/20',
  };

  const iconVariants = {
    primary: 'bg-primary-500/20 text-primary-900 dark:text-primary-500',
    secondary: 'bg-chart-highlight/20 text-chart-highlight',
    accent: 'bg-chart-fuel/20 text-chart-fuel',
    danger: 'bg-danger/20 text-danger',
  };

  return (
    <div className={`relative overflow-hidden glass-card bg-gradient-to-br ${variants[variant]} border hover:shadow-lg transition-all duration-300 group`}>
      <div className="flex flex-col gap-2 justify-between items-start mb-4">
          <div className={`p-3 rounded-2xl ${iconVariants[variant]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div>
          <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
        </div>
      
      </div>
      
      {chart && (
        <div className="mt-4 h-16 w-full opacity-50 group-hover:opacity-100 transition-opacity">
          {chart}
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}
      
      {/* Subtle background glow */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl rounded-full opacity-20 ${iconVariants[variant].split(' ')[0]}`} />
    </div>
  );
};

export default ProCard;
