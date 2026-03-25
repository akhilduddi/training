import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { AdminThemeProvider } from './context/AdminThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import CompanyList from './pages/CompanyList';
import CompanyProfile from './pages/CompanyProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import Contact from './pages/Contact';
import Advertise from './pages/Advertise';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCompanies from './pages/admin/AdminCompanies';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminAnalytics from './pages/admin/AdminAnalytics';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public / Main Site */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="companies" element={<CompanyList />} />
              <Route path="companies/:slug" element={<CompanyProfile />} />
              <Route path="contact" element={<Contact />} />
              <Route path="advertise" element={<Advertise />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="dashboard/company" element={<CompanyDashboard />} />
            </Route>

            {/* Admin Panel — protected, separate layout */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminThemeProvider>
                    <AdminLayout />
                  </AdminThemeProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="companies" element={<AdminCompanies />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
