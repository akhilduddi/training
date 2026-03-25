import { useState, useEffect } from 'react';
import { Search, AlertCircle, ChevronDown, Plus, X, Pencil, Trash2 } from 'lucide-react';
import { getUsers, changeUserRole, addAdminUser, updateUser, deleteUser } from '../api/adminApi';
import { useAuth } from '../context/AuthContext';

const ROLE_COLORS = {
  admin:   'text-purple-400 border-purple-500/30 bg-purple-500/10',
  company: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  user:    'text-[color:var(--admin-text-secondary)] border-slate-500/30 bg-slate-500/10',
  employee:'text-amber-400 border-amber-500/30 bg-amber-500/10',
};

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [changingRole, setChangingRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generative State
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

  // Update State
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });

  const fetchUsers = async () => {
    setLoading(true); setError('');
    try { setUsers(await getUsers()); }
    catch (err) { setError(err?.response?.data?.message || 'Failed to load users.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    if (id === currentUser?._id) return alert("You cannot change your own role.");
    setChangingRole(id);
    try {
      await changeUserRole(id, role);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
    } catch (err) { alert(err?.response?.data?.message || 'Failed to change role.'); }
    finally { setChangingRole(''); }
  };

  const handleDeleteUser = async (id) => {
    if (id === currentUser?._id) return alert("You cannot delete your active session account.");
    if (!window.confirm("Are you certain you wish to permanently delete this user? All associated data connections may be lost.")) return;
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete user.');
    }
  };

  // Create Handlers
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await addAdminUser(formData);
      setIsAdding(false);
      setFormData({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to provision account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit Handlers
  const openEditMode = (u) => {
    setIsEditing(u._id);
    setEditFormData({ name: u.name, email: u.email });
  };
  const handleEditFormChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await updateUser(isEditing, editFormData);
      setIsEditing(null);
      fetchUsers();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = users.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  // --- Add User View ---
  if (isAdding) {
    return (
      <div className="max-w-xl mx-auto space-y-6 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Add Administrator / User</h1>
            <p className="text-[color:var(--admin-text-secondary)] text-sm">Create a new account profile with native system permissions.</p>
          </div>
          <button onClick={() => setIsAdding(false)} className="px-4 py-2 border border-[color:var(--admin-border)] hover:bg-[color:var(--admin-hover)] text-[color:var(--admin-text-primary)] font-semibold rounded-xl text-sm transition-colors flex items-center gap-2">
            <X className="h-4 w-4" /> Cancel
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}

        <div className="bg-[color:var(--admin-bg-main)] border border-[color:var(--admin-border)] rounded-2xl shadow-sm overflow-hidden">
          <form onSubmit={handleCreateUser} className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Account Role *</label>
                <select required name="role" value={formData.role} onChange={handleFormChange} className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500">
                  <option value="user">Standard User</option>
                  <option value="company">Company Rep</option>
                  <option value="admin">Administrator / Manager</option>
                </select>
                <p className="text-xs text-[color:var(--admin-text-secondary)]">Note: Constrained Employees are created via the explicit "Employees" tab.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Full Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="e.g. John Doe" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="admin@cgxp.tech" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Password *</label>
                <input required type="password" name="password" minLength={6} value={formData.password} onChange={handleFormChange} placeholder="Min 6 characters" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button disabled={isSubmitting} type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-colors w-full sm:w-auto">
                {isSubmitting ? 'Provisioning Account...' : 'Provision Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- Edit User View ---
  if (isEditing) {
    return (
      <div className="max-w-xl mx-auto space-y-6 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Edit User Account</h1>
            <p className="text-[color:var(--admin-text-secondary)] text-sm">Modify naming and identity configurations natively.</p>
          </div>
          <button onClick={() => setIsEditing(null)} className="px-4 py-2 border border-[color:var(--admin-border)] hover:bg-[color:var(--admin-hover)] text-[color:var(--admin-text-primary)] font-semibold rounded-xl text-sm transition-colors flex items-center gap-2">
            <X className="h-4 w-4" /> Cancel
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}

        <div className="bg-[color:var(--admin-bg-main)] border border-[color:var(--admin-border)] rounded-2xl shadow-sm overflow-hidden">
          <form onSubmit={handleUpdateUser} className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Full Name *</label>
                <input required type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} placeholder="e.g. John Doe" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Email Address *</label>
                <input required type="email" name="email" value={editFormData.email} onChange={handleEditFormChange} placeholder="admin@cgxp.tech" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button disabled={isSubmitting} type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-colors w-full sm:w-auto">
                {isSubmitting ? 'Updating Protocol...' : 'Save Configuration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- Main Data Table View ---
  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">User Management</h1>
          <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">{users.length} registered accounts</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="h-4 w-4" /> Add User
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--admin-text-secondary)]" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
          className="w-full pl-9 pr-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] placeholder-slate-500 focus:outline-none focus:border-blue-500" />
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)]">
                <th className="text-left px-5 py-4 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">User</th>
                <th className="text-left px-5 py-4 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold hidden sm:table-cell">Email</th>
                <th className="text-left px-5 py-4 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">Role</th>
                <th className="text-left px-5 py-4 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold hidden md:table-cell">Joined</th>
                <th className="text-right px-5 py-4 text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-wider font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--admin-border)] text-[color:var(--admin-text-primary)]">
              {loading ? (
                <tr><td colSpan={5} className="py-16 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-[color:var(--admin-text-secondary)]">No users found.</td></tr>
              ) : filtered.map(u => (
                <tr key={u._id} className="hover:bg-[color:var(--admin-hover)]/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs flex-shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-xs text-[color:var(--admin-text-secondary)] sm:hidden">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[color:var(--admin-text-secondary)] hidden sm:table-cell">{u.email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold border uppercase tracking-wider ${ROLE_COLORS[u.role] || ROLE_COLORS.user}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[color:var(--admin-text-secondary)] text-xs hidden md:table-cell">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end items-center gap-2">
                      <div className="relative">
                        <select
                          value={u.role}
                          disabled={changingRole === u._id || u._id === currentUser?._id}
                          onChange={e => handleRoleChange(u._id, e.target.value)}
                          className="appearance-none pl-3 pr-8 py-1.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-lg text-xs font-medium text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500 disabled:opacity-40 cursor-pointer"
                        >
                          <option value="user">User</option>
                          <option value="company">Company</option>
                          <option value="admin">Admin</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[color:var(--admin-text-secondary)] pointer-events-none" />
                      </div>
                      
                      <button onClick={() => openEditMode(u)} className="p-1.5 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit Metadata">
                        <Pencil className="h-4 w-4" />
                      </button>
                      
                      <button 
                        onClick={() => handleDeleteUser(u._id)} 
                        disabled={u._id === currentUser?._id}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
