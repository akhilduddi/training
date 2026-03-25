import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
         <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 bg-primary rounded border border-[#004182] flex items-center justify-center shadow-sm">
               <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-3xl text-gray-900 tracking-tight">cGxP.Directory</span>
         </Link>
         <p className="text-gray-600 font-medium text-sm">Secure Authentication Portal</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[420px]">
        {/* Formal Login Card */}
        <div className="bg-white p-8 md:p-10 border border-gray-300 border-t-4 border-t-primary rounded-sm shadow-sm">
          
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center border-b border-gray-100 pb-4">ACCOUNT SIGN IN</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm px-4 py-3 mb-5">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">Registered Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors"
                placeholder="Ex. you@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                 <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Secure Password *</label>
                 <a href="#" className="text-xs font-bold text-primary hover:underline transition-colors uppercase">
                   Forgot Password?
                 </a>
              </div>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-colors"
                placeholder="Enter your private credential"
              />
            </div>

            <div className="pt-4 mt-6 border-t border-gray-100 text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-[#004182] text-white font-bold tracking-wide py-3.5 px-6 rounded-sm shadow-sm transition-colors uppercase text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'AUTHORIZING...' : 'AUTHORIZE LOGIN'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center bg-gray-50 p-4 border border-gray-200 rounded-sm">
             <p className="text-sm text-gray-600 font-medium mb-3">Enterprise not listed in the registry?</p>
             <Link
               to="/register"
               className="inline-block w-full text-center bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-bold tracking-wide uppercase text-xs py-2.5 px-4 rounded-sm transition-colors"
             >
               REGISTER NEW ORGANIZATION
             </Link>
          </div>
          
        </div>
        
        {/* Support Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 font-medium uppercase tracking-widest">
           <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
           <span className="mx-2">|</span>
           <a href="#" className="hover:text-gray-900 transition-colors">Support Center</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
