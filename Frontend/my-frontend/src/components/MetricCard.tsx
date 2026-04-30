export default function MetricCard({ title, value, change, icon: Icon, trend }: { title: string, value: string, change: string, icon: any, trend: 'up' | 'down' }) {
  const isPositive = trend === 'up';

  return (
    <div className="glass-card flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-primary-500/10 text-primary-900 dark:text-primary-500 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${isPositive ? 'bg-primary-500/20 text-primary-900 dark:text-primary-500' : 'bg-danger/20 text-danger'}`}>
          {change} vs last month
        </div>
      </div>
      <div>
        <h3 className="text-text-muted text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
