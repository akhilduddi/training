import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1') + '/admin',
});

// Attach Bearer token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cgxp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Dashboard ──────────────────────────────────────────────
export const getDashboardStats = () => api.get('/dashboard').then(r => r.data.data);

// ── Companies ─────────────────────────────────────────────
export const getAdminCompanies = (params = {}) =>
  api.get('/companies', { params }).then(r => r.data);

export const changeCompanyStatus = (id, status) =>
  api.put(`/companies/${id}/status`, { status }).then(r => r.data.data);

export const verifyCompany = (id, isVerified, badge) =>
  api.put(`/companies/${id}/verify`, { isVerified, badge }).then(r => r.data.data);

// ── Users ──────────────────────────────────────────────────
export const getUsers = () => api.get('/users').then(r => r.data.data);

export const changeUserRole = (id, role) =>
  api.put(`/users/${id}/role`, { role }).then(r => r.data.data);

// ── Reviews ────────────────────────────────────────────────
export const getPendingReviews = () => api.get('/reviews').then(r => r.data.data);

export const approveReview = (id) =>
  api.put(`/reviews/${id}/approve`).then(r => r.data.data);

// ── Analytics ─────────────────────────────────────────────
export const getPlatformGrowth = () => api.get('/analytics/growth').then(r => r.data.data);
