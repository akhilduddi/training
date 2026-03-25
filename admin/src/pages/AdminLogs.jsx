import { useState, useEffect } from 'react';
import { getAuditLogs } from '../api/adminApi';
import { Search, AlertCircle, Activity, Filter, Clock } from 'lucide-react';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  const fetchLogs = async () => {
    setLoading(true); setError('');
    try {
      const data = await getAuditLogs();
      setLogs(data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch systemic audit logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const uniqueActions = [...new Set(logs.map(log => log.action))].sort();

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !search || 
      log.details.toLowerCase().includes(search.toLowerCase()) || 
      log.performedBy?.name?.toLowerCase().includes(search.toLowerCase());
    
    const matchesAction = !actionFilter || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const getActionColor = (action) => {
    if (action.includes('DELETED') || action.includes('REJECTED')) return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (action.includes('CREATED') || action.includes('ADDED') || action.includes('APPROVED')) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (action.includes('UPDATED')) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  };

  return (
    <div className="space-y-6 fade-in h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)] flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" /> System Audit Logs
          </h1>
          <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">{filteredLogs.length} traced sequential events</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--admin-text-secondary)]" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search by details or administrator name..."
            className="w-full pl-9 pr-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] placeholder-slate-500 focus:outline-none focus:border-blue-500" 
          />
        </div>
        
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--admin-text-secondary)]" />
          <select 
            value={actionFilter} 
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
          >
            <option value="">All Actions</option>
            {uniqueActions.map(action => (
              <option key={action} value={action}>{action.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm flex-shrink-0">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-2xl overflow-hidden shadow-sm flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[color:var(--admin-bg-nav)] z-10 border-b border-[color:var(--admin-border)]">
              <tr>
                <th className="text-left px-6 py-4 text-xs tracking-wider text-[color:var(--admin-text-secondary)] uppercase font-semibold">Event Vector</th>
                <th className="text-left px-6 py-4 text-xs tracking-wider text-[color:var(--admin-text-secondary)] uppercase font-semibold">Entity Type</th>
                <th className="text-left px-6 py-4 text-xs tracking-wider text-[color:var(--admin-text-secondary)] uppercase font-semibold">Operations Details</th>
                <th className="text-left px-6 py-4 text-xs tracking-wider text-[color:var(--admin-text-secondary)] uppercase font-semibold">Administrator</th>
                <th className="text-right px-6 py-4 text-xs tracking-wider text-[color:var(--admin-text-secondary)] uppercase font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--admin-border)] text-[color:var(--admin-text-primary)] relative">
              {loading ? (
                <tr><td colSpan={5} className="py-16 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div></td></tr>
              ) : filteredLogs.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-[color:var(--admin-text-secondary)] flex flex-col items-center justify-center gap-2"><Activity className="w-8 h-8 opacity-20" /> No audit events observed mapping your query.</td></tr>
              ) : filteredLogs.map((log) => (
                <tr key={log._id} className="hover:bg-[color:var(--admin-hover)]/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold border uppercase tracking-widest ${getActionColor(log.action)}`}>
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[color:var(--admin-text-secondary)] font-medium">
                      {log.entityType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[color:var(--admin-text-primary)] max-w-md truncate" title={log.details}>{log.details}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                         {log.performedBy?.name?.charAt(0) || 'A'}
                       </div>
                       <span className="font-semibold">{log.performedBy?.name || 'Unknown Admin'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-[color:var(--admin-text-secondary)] text-xs whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 opacity-60" />
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
