import PageLayout from '../components/PageLayout';
import { Search, UserPlus } from 'lucide-react';
import { staffPerformance } from '../data/mockData';

export default function Staff() {
  return (
    <PageLayout 
      title="Staff Management" 
      description="Manage personnel and view performance metrics"
      actions={
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg">
          <UserPlus className="w-4 h-4" />
          Add Staff
        </button>
      }
    >
      <div className="glass-card">
        <div className="flex justify-between items-center mb-6">
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
              <Search className="w-5 h-5" />
            </div>
            <input type="text" className="glass-input w-full pl-10" placeholder="Search staff members..." />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-text-muted text-sm border-b border-black/5 dark:border-white/10">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Performance (Sales)</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {staffPerformance.map((staff, i) => (
                <tr key={staff.id} className={i % 2 === 0 ? "bg-black/[0.02] dark:bg-white/[0.02]" : ""}>
                  <td className="py-3 font-medium px-2">{staff.name}</td>
                  <td className="py-3 text-text-muted">{staff.role}</td>
                  <td className="py-3">{staff.sales}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-900 dark:text-primary-500 rounded text-xs font-medium">
                      {staff.status}
                    </span>
                  </td>
                  <td className="py-3 text-primary-500 hover:text-primary-600 font-medium cursor-pointer">
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
