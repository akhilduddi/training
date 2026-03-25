import { useState, useEffect } from 'react';
import { getEmployees, addEmployee, getUsers } from '../api/adminApi';
import { Plus, Search, AlertCircle, Briefcase, Mail, User as UserIcon, X, CheckCircle } from 'lucide-react';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // For the dropdown of managers, we can fetch all users or admins
  const [potentialManagers, setPotentialManagers] = useState([]);

  // View state
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    jobRole: '',
    primaryManager: '',
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data || []);
      
      // Also fetch admins/managers for the dropdown
      const usersData = await getUsers();
      setPotentialManagers(usersData.filter(u => u.role === 'admin' || u.role === 'employee'));
      
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await addEmployee(formData);
      setIsAdding(false);
      setFormData({ jobRole: '', primaryManager: '', employeeId: '', firstName: '', lastName: '', email: '', password: '' });
      fetchEmployees();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAdding) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)]">Add Employee</h1>
            <p className="text-[color:var(--admin-text-secondary)] text-sm">Create a restricted access corporate account.</p>
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
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Role *</label>
                <input required type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} placeholder="e.g. Lead, Developer" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Primary Manager *</label>
                <select required name="primaryManager" value={formData.primaryManager} onChange={handleChange} className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500">
                  <option value="">Select Primary Manager</option>
                  {potentialManagers.map(m => (
                    <option key={m._id} value={m.name}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 md:col-span-2 border-b border-[color:var(--admin-border)] pb-6 mb-2">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Employee ID *</label>
                <input required type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Enter Employee ID" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">First Name *</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Last Name *</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="employee@company.com" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Password *</label>
                <input required type="password" name="password" minLength={6} value={formData.password} onChange={handleChange} placeholder="Min 6 characters" className="w-full px-4 py-2.5 bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-xl text-sm text-[color:var(--admin-text-primary)] focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button disabled={isSubmitting} type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-colors">
                {isSubmitting ? 'Creating...' : 'Create Employee Access'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--admin-text-primary)] flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-500" /> Employee Roster
          </h1>
          <p className="text-[color:var(--admin-text-secondary)] text-sm mt-1">{employees.length} active employee credentials</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="h-4 w-4" /> Add Employee
        </button>
      </div>

      <div className="bg-[color:var(--admin-bg-card)] border border-[color:var(--admin-border)] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[color:var(--admin-border)] bg-[color:var(--admin-bg-nav)]">
                <th className="text-left px-6 py-4 text-xs font-semibold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Employee</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Job Role</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Manager</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-[color:var(--admin-text-secondary)] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--admin-border)] text-[color:var(--admin-text-primary)]">
              {loading ? (
                <tr><td colSpan={4} className="py-16 text-center"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
              ) : employees.length === 0 ? (
                <tr><td colSpan={4} className="py-16 text-center text-[color:var(--admin-text-secondary)]">No employees registered yet.</td></tr>
              ) : employees.map(emp => (
                <tr key={emp._id} className="hover:bg-[color:var(--admin-hover)]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                        {emp.employeeProfile?.firstName?.charAt(0) || 'E'}
                      </div>
                      <div>
                        <p className="font-semibold text-[color:var(--admin-text-primary)]">{emp.employeeProfile?.firstName} {emp.employeeProfile?.lastName}</p>
                        <div className="flex items-center gap-2 text-xs text-[color:var(--admin-text-secondary)] mt-0.5">
                          <span>{emp.employeeProfile?.employeeId || emp._id.toString().slice(-6)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {emp.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{emp.employeeProfile?.jobRole || '—'}</td>
                  <td className="px-6 py-4 text-[color:var(--admin-text-secondary)]">{emp.employeeProfile?.primaryManager || '—'}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle className="w-3.5 h-3.5" /> Active
                    </span>
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

export default AdminEmployees;
