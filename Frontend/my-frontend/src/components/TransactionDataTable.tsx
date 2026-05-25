import React from 'react';
import { Search, Sparkles, Calendar, ChevronDown, MoreHorizontal } from 'lucide-react';

interface Column {
  id: string;
  label: string;
  alignment?: 'Left' | 'Center' | 'Right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface TransactionDataTableProps {
  columns: Column[];
  data: any[];
  onSearch?: (value: string) => void;
  loading?: boolean;
}

const TransactionDataTable: React.FC<TransactionDataTableProps> = ({ columns, data, onSearch, loading }) => {
  return (
    <div className="flex flex-col w-full bg-[var(--bg-base)] text-[var(--text-primary)] font-sans rounded-2xl border border-[var(--border-base)] overflow-hidden">
      {/* Toolbar */}
      <div className="h-[64px] flex items-center justify-between px-6 border-b border-[var(--border-base)] gap-3 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-3">
          <div className="relative w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search Transaction..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--surface-base)] border border-[var(--border-base)] rounded-xl text-[14px] outline-none focus:border-[var(--text-secondary)] transition-all"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
          
          <div className="hidden lg:flex items-center gap-3">
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--surface-base)] border border-[var(--border-base)] rounded-xl text-[12px] font-semibold text-[var(--text-primary)] transition-all hover:bg-[var(--border-base)]">
          More
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="h-[48px] border-b border-[var(--border-base)] bg-[var(--bg-base)]">
              {columns.map((col) => (
                <th 
                  key={col.id}
                  className={`px-4 text-[13px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider ${
                    col.alignment === 'Right' ? 'text-right' : col.alignment === 'Center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.label}
                </th>
              ))}
              <th className="w-[48px] px-6"></th>
            </tr>
          </thead>
          <tbody className="text-[14px] font-medium">
            {loading ? (
              <tr><td colSpan={columns.length + 2} className="py-20 text-center text-[var(--text-secondary)] italic">Loading high-density data...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length + 2} className="py-20 text-center text-[var(--text-secondary)] italic">No records found</td></tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="h-[64px] border-b border-[var(--border-base)] hover:bg-[var(--surface-base)]/50 transition-colors group">
                  {columns.map((col) => (
                    <td 
                      key={col.id}
                      className={`px-4 text-[var(--text-primary)] ${
                        col.alignment === 'Right' ? 'text-right' : col.alignment === 'Center' ? 'text-center' : 'text-left'
                      }`}
                    >
                      {col.render ? col.render(row[col.id], row) : row[col.id]}
                    </td>
                  ))}
                  <td className="px-6 text-right">
                    <button className="p-2 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity hover:text-[var(--text-primary)]">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDataTable;
