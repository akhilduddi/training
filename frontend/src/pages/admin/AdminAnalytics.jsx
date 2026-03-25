import { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { getPlatformGrowth } from '../../api/adminApi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';

const StatSummaryCard = ({ label, value, color }) => (
  <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl p-5">
    <p className="text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-medium">{label}</p>
    <p className={`text-2xl font-bold mt-1 ${color}`}>{value?.toLocaleString() ?? '—'}</p>
  </div>
);

const AdminAnalytics = () => {
  const [growth, setGrowth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPlatformGrowth();
        setGrowth(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totals = growth.reduce(
    (acc, d) => ({
      views: acc.views + (d.views || 0),
      inquiries: acc.inquiries + (d.inquiries || 0),
      contactClicks: acc.contactClicks + (d.contactClicks || 0),
    }),
    { views: 0, inquiries: 0, contactClicks: 0 }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Platform Analytics</h1>
        <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">Aggregated activity over time</p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatSummaryCard label="Total Views"          value={totals.views}        color="text-blue-400" />
        <StatSummaryCard label="Total Inquiries"      value={totals.inquiries}    color="text-emerald-400" />
        <StatSummaryCard label="Total Contact Clicks" value={totals.contactClicks} color="text-amber-400" />
      </div>

      {/* Line Chart */}
      <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          <h2 className="text-[color:var(--admin-text-primary)] font-semibold">Activity Over Time</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : growth.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[color:var(--admin-text-secondary)]">
            <TrendingUp className="h-12 w-12 mb-3 opacity-30" />
            <p className="font-medium">No analytics data yet</p>
            <p className="text-sm mt-1">Data will appear here as users interact with listings.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={growth} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="_id" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--admin-bg-card)', border: '1px solid var(--admin-border)', borderRadius: 8 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
              <Line type="monotone" dataKey="views"         stroke="#3b82f6" strokeWidth={2} dot={false} name="Views" />
              <Line type="monotone" dataKey="inquiries"     stroke="#10b981" strokeWidth={2} dot={false} name="Inquiries" />
              <Line type="monotone" dataKey="contactClicks" stroke="#f59e0b" strokeWidth={2} dot={false} name="Contact Clicks" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
