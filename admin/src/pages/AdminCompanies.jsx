import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, XCircle, ShieldCheck, ChevronLeft, ChevronRight, AlertCircle, Plus, Upload } from 'lucide-react';
import { getAdminCompanies, changeCompanyStatus, verifyCompany } from '../api/adminApi';
const STATUS_COLORS = {
  active:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  pending:   'bg-amber-500/10 text-amber-400 border-amber-500/30',
  rejected:  'bg-red-500/10 text-red-400 border-red-500/30',
  suspended: 'bg-slate-500/10 text-[color:var(--admin-text-secondary)] border-slate-500/30',
};

const Badge = ({ status }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border uppercase tracking-wide ${STATUS_COLORS[status] || STATUS_COLORS.pending}`}>
    {status}
  </span>
);

const AdminCompanies = () => {
  const [data, setData] = useState({ data: [], total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState('');
  
  const navigate = useNavigate();

  const fetchCompanies = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = { page, limit: 15 };
      if (statusFilter) params.status = statusFilter;
      const res = await getAdminCompanies(params);
      setData(res);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load companies.');
    } finally { setLoading(false); }
  }, [page, statusFilter]);

  useEffect(() => { fetchCompanies(); }, [fetchCompanies]);

  const handleStatusChange = async (id, status) => {
    setActionLoading(id + status);
    try { await changeCompanyStatus(id, status); await fetchCompanies(); }
    catch (err) { alert(err?.response?.data?.message || 'Action failed.'); }
    finally { setActionLoading(''); }
  };

  const handleVerify = async (id, current) => {
    setActionLoading(id + 'verify');
    try { await verifyCompany(id, !current); await fetchCompanies(); }
    catch (err) { alert(err?.response?.data?.message || 'Action failed.'); }
    finally { setActionLoading(''); }
  };

  const filtered = data.data.filter(c =>
    !search || c.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const getPages = () => {
    const total = data.pages;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) pages.push(i);
    if (page < total - 2) pages.push('...');
    pages.push(total);
    return pages;
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Company Management</h1>
          <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">{data.total} companies in registry</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/companies/bulk-upload')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[color:var(--admin-bg-nav)] border border-[color:var(--admin-border)] hover:bg-[color:var(--admin-hover)] text-[color:var(--admin-text-primary)] font-semibold rounded-xl text-sm transition-colors"
          >
            <Upload className="h-4 w-4" /> Bulk CSV
          </button>
          <button
            onClick={() => navigate('/companies/add-single')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus className="h-4 w-4" /> Add Company
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--admin-text-secondary)]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies..."
            className="w-full pl-9 pr-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] placeholder-slate-500 focus:outline-none focus:border-blue-500" />
        </div>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-secondary)] focus:outline-none focus:border-blue-500">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)]">
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">Company</th>
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold hidden sm:table-cell">Industry</th>
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">Status</th>
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold hidden md:table-cell">Verified</th>
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold hidden lg:table-cell">Joined</th>
                <th className="text-right px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--admin-border)]">
              {loading ? (
                <tr><td colSpan={6} className="py-16 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-16 text-center text-[color:var(--admin-text-secondary)]">No companies found.</td></tr>
              ) : filtered.map(c => (
                <tr key={c._id} className="hover:bg-[color:var(--admin-hover)]/20 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-[color:var(--admin-text-primary)] font-medium">{c.companyName}</p>
                    <p className="text-xs text-[color:var(--admin-text-secondary)] mt-0.5">{c.address?.country || '—'}</p>
                  </td>
                  <td className="px-5 py-4 text-[color:var(--admin-text-secondary)] hidden sm:table-cell">{c.industryType || '—'}</td>
                  <td className="px-5 py-4"><Badge status={c.status} /></td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    {c.isVerified ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-slate-700" />}
                  </td>
                  <td className="px-5 py-4 text-[color:var(--admin-text-secondary)] text-xs hidden lg:table-cell">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1 flex-wrap">
                      {c.status !== 'active'    && <button onClick={() => handleStatusChange(c._id, 'active')}    disabled={!!actionLoading} className="px-2 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/10 transition-colors disabled:opacity-40">Approve</button>}
                      {c.status !== 'rejected'  && <button onClick={() => handleStatusChange(c._id, 'rejected')}  disabled={!!actionLoading} className="px-2 py-1 text-xs font-semibold text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-40">Reject</button>}
                      {c.status !== 'suspended' && <button onClick={() => handleStatusChange(c._id, 'suspended')} disabled={!!actionLoading} className="px-2 py-1 text-xs font-semibold text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-colors disabled:opacity-40">Suspend</button>}
                      <button onClick={() => handleVerify(c._id, c.isVerified)} disabled={!!actionLoading}
                        className="px-2 py-1 text-xs font-semibold text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors disabled:opacity-40 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />{c.isVerified ? 'Unverify' : 'Verify'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.pages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[color:var(--admin-border)]">
            <span className="text-xs text-[color:var(--admin-text-secondary)]">Page {page} of {data.pages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg text-[color:var(--admin-text-secondary)] hover:text-[color:var(--admin-text-primary)] hover:bg-[color:var(--admin-hover)] disabled:opacity-30 transition-colors"><ChevronLeft className="h-4 w-4" /></button>
              {getPages().map((p, i) =>
                p === '...' ? <span key={i} className="px-2 text-[color:var(--admin-text-secondary)] text-sm">…</span>
                : <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-blue-600 text-[color:var(--admin-text-primary)]' : 'text-[color:var(--admin-text-secondary)] hover:text-[color:var(--admin-text-primary)] hover:bg-[color:var(--admin-hover)]'}`}>{p}</button>
              )}
              <button onClick={() => setPage(p => Math.min(data.pages, p + 1))} disabled={page === data.pages}
                className="p-1.5 rounded-lg text-[color:var(--admin-text-secondary)] hover:text-[color:var(--admin-text-primary)] hover:bg-[color:var(--admin-hover)] disabled:opacity-30 transition-colors"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminCompanies;
