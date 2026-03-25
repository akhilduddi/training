import { useState, useEffect } from 'react';
import { Search, AlertCircle, ChevronDown } from 'lucide-react';
import { getUsers, changeUserRole } from '../../api/adminApi';
import { useAuth } from '../../context/AuthContext';

const ROLE_COLORS = {
  admin:   'text-purple-400 border-purple-500/30 bg-purple-500/10',
  company: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  user:    'text-[color:var(--admin-text-secondary)] border-slate-500/30 bg-slate-500/10',
};

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [changingRole, setChangingRole] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    if (id === currentUser?._id) return alert("You cannot change your own role.");
    setChangingRole(id);
    try {
      await changeUserRole(id, role);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to change role.');
    } finally {
      setChangingRole('');
    }
  };

  const filtered = users.filter(u =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">User Management</h1>
        <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">{users.length} registered accounts</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--admin-text-secondary)]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-4 py-2 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-lg text-sm text-[color:var(--admin-text-primary)] placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--admin-border)] bg-slate-800/50">
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">User</th>
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold hidden sm:table-cell">Email</th>
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">Role</th>
                <th className="text-left px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold hidden md:table-cell">Joined</th>
                <th className="text-right px-5 py-3 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr><td colSpan={5} className="py-16 text-center text-[color:var(--admin-text-secondary)]">
                  <div className="flex justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-[color:var(--admin-text-secondary)]">No users found.</td></tr>
              ) : filtered.map(u => (
                <tr key={u._id} className="hover:bg-[color:var(--admin-hover)]/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-[color:var(--admin-text-primary)] font-semibold text-xs flex-shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[color:var(--admin-text-primary)] font-medium">{u.name}</p>
                        <p className="text-xs text-[color:var(--admin-text-secondary)] sm:hidden">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[color:var(--admin-text-secondary)] hidden sm:table-cell">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border uppercase ${ROLE_COLORS[u.role] || ROLE_COLORS.user}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[color:var(--admin-text-secondary)] text-xs hidden md:table-cell">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <div className="relative">
                        <select
                          value={u.role}
                          disabled={changingRole === u._id || u._id === currentUser?._id}
                          onChange={e => handleRoleChange(u._id, e.target.value)}
                          className="appearance-none pl-3 pr-7 py-1.5 bg-slate-800 border border-[color:var(--admin-border)] rounded text-xs text-[color:var(--admin-text-secondary)] focus:outline-none focus:border-blue-500 disabled:opacity-40 cursor-pointer"
                        >
                          <option value="user">User</option>
                          <option value="company">Company</option>
                          <option value="admin">Admin</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[color:var(--admin-text-secondary)] pointer-events-none" />
                      </div>
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

export default AdminUsers;
