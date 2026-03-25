import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminThemeProvider } from './context/AdminThemeContext';
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminCompanies from './pages/AdminCompanies';
import AdminUsers from './pages/AdminUsers';
import AdminEmployees from './pages/AdminEmployees';
import AdminReviews from './pages/AdminReviews';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminLogs from './pages/AdminLogs';
import AddCompanyPage from './pages/AddCompanyPage';
import BulkImportPage from './pages/BulkImportPage';
import Login from './pages/Login';

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0d1b2e]">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Guard: must be logged-in admin
const RequireAdmin = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// If already logged in, skip the login page
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (user) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <RequireAdmin>
                <AdminThemeProvider>
                  <AdminLayout />
                </AdminThemeProvider>
              </RequireAdmin>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="companies" element={<AdminCompanies />} />
            <Route path="companies/add-single" element={<AddCompanyPage />} />
            <Route path="companies/bulk-upload" element={<BulkImportPage />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* Catch‑all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
