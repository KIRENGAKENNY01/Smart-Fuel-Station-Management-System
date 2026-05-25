import PageLayout from '../components/PageLayout';
import { Download, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TransactionService, ReportService, StationService } from '../services/api';
import TransactionDataTable from '../components/TransactionDataTable';

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Transactions() {
  const [txns, setTxns] = useState<any[]>([]);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stationId, setStationId] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [period, setPeriod] = useState('daily');

  const fetchTx = async () => {
    setLoading(true);
    try {
      const res = await TransactionService.getAllTransactions({
        stationId: stationId || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        limit: 100,
      });
      setTxns(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    StationService.getAll().then((r) => setStations(r.data.data || []));
    fetchTx();
  }, []);

  const columns = [
    { id: 'transactionId', label: 'ID', render: (v: string) => <span className="font-mono text-xs">#{String(v).slice(-8)}</span> },
    { id: 'stationId', label: 'Station', render: (v: string) => stations.find((s) => s._id === v)?.name || v?.slice?.(-6) },
    { id: 'liters', label: 'Liters', render: (v: number) => `${v} L` },
    { id: 'totalAmount', label: 'Amount', render: (v: number) => `${v?.toLocaleString()} RWF` },
    { id: 'status', label: 'Status', render: (v: string) => <span className="text-xs font-bold uppercase">{v}</span> },
    { id: 'createdAt', label: 'Date', render: (v: string) => new Date(v).toLocaleString() },
  ];

  return (
    <PageLayout
      title="All Transactions"
      description="View and filter system-wide transactions"
      actions={
        <button type="button" onClick={async () => {
          try {
            const r = await ReportService.downloadAdmin(period);
            downloadBlob(r.data, `admin-report-${period}.json`);
          } catch {
            alert('Failed to export report. Please try again.');
          }
        }} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-primary-900 font-medium rounded-lg">
          <Download className="w-4 h-4" /> Export report
        </button>
      }
    >
      <div className="glass-card p-4 mb-6 flex flex-wrap gap-4 items-end">
        <Filter className="w-5 h-5 text-text-muted" />
        <select className="glass-input" value={stationId} onChange={(e) => setStationId(e.target.value)}>
          <option value="">All stations</option>
          {stations.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
        <input type="date" className="glass-input" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        <input type="date" className="glass-input" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        <select className="glass-input" value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="daily">Daily report</option>
          <option value="weekly">Weekly report</option>
          <option value="monthly">Monthly report</option>
        </select>
        <button type="button" onClick={fetchTx} className="px-4 py-2 bg-primary-500 text-primary-900 font-bold rounded-lg">Apply</button>
      </div>
      <TransactionDataTable columns={columns} data={txns} loading={loading} />
    </PageLayout>
  );
}
