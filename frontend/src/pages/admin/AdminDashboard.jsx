import { useState, useEffect } from 'react';
import {
  Building2, Users, Eye, ClipboardList, Star, TrendingUp, AlertCircle
} from 'lucide-react';
import { getDashboardStats, getPlatformGrowth } from '../../api/adminApi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl p-5 flex items-start gap-4">
    <div className={`h-11 w-11 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="h-5 w-5 text-[color:var(--admin-text-primary)]" />
    </div>
    <div>
      <p className="text-[color:var(--admin-text-secondary)] text-xs uppercase tracking-wider font-medium">{label}</p>
      <p className="text-[color:var(--admin-text-primary)] text-2xl font-bold mt-0.5">{value ?? '—'}</p>
      {sub && <p className="text-xs text-[color:var(--admin-text-secondary)] mt-1">{sub}</p>}
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [growth, setGrowth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [s, g] = await Promise.all([getDashboardStats(), getPlatformGrowth()]);
        setStats(s);
        setGrowth(g.slice(-30)); // last 30 data points
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
      <AlertCircle className="h-5 w-5 flex-shrink-0" /> {error}
    </div>
  );

  const cards = [
    { icon: Building2, label: 'Total Companies',   value: stats?.totalCompanies,   color: 'bg-blue-600',   sub: `${stats?.activeCompanies} active` },
    { icon: ClipboardList, label: 'Pending Approval', value: stats?.pendingCompanies, color: 'bg-amber-600',  sub: 'Awaiting review' },
    { icon: Users,      label: 'Total Users',       value: stats?.totalUsers,       color: 'bg-indigo-600', sub: 'Registered accounts' },
    { icon: Eye,        label: 'Total Views',        value: stats?.totalViews?.toLocaleString(), color: 'bg-cyan-600',   sub: 'Across all profiles' },
    { icon: ClipboardList, label: 'Total Inquiries', value: stats?.totalInquiries,  color: 'bg-emerald-600', sub: 'Submitted contacts' },
    { icon: Star,       label: 'Pending Reviews',    value: stats?.pendingReviews,   color: 'bg-rose-600',   sub: 'Awaiting moderation' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Dashboard Overview</h1>
        <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">Real-time platform statistics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map(c => <StatCard key={c.label} {...c} />)}
      </div>

      {/* Growth Chart */}
      <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          <h2 className="text-[color:var(--admin-text-primary)] font-semibold">Platform Activity</h2>
          <span className="text-xs text-[color:var(--admin-text-secondary)] ml-auto">Last 30 days</span>
        </div>
        {growth.length === 0 ? (
          <p className="text-[color:var(--admin-text-secondary)] text-sm text-center py-12">No analytics data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={growth} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--admin-bg-card)', border: '1px solid var(--admin-border)', borderRadius: 8 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              <Bar dataKey="views"        fill="#3b82f6" radius={[4,4,0,0]} name="Views" />
              <Bar dataKey="inquiries"    fill="#10b981" radius={[4,4,0,0]} name="Inquiries" />
              <Bar dataKey="contactClicks" fill="#f59e0b" radius={[4,4,0,0]} name="Contact Clicks" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
