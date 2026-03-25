import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1') + '/admin',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cgxp_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getDashboardStats  = () => api.get('/dashboard').then(r => r.data.data);
export const getAuditLogs       = () => api.get('/logs').then(r => r.data.data);
export const getPlatformGrowth  = () => api.get('/analytics/growth').then(r => r.data.data);

export const getAdminCompanies   = (params = {}) => api.get('/companies', { params }).then(r => r.data);
export const addAdminCompany     = (data) => api.post('/companies', data).then(r => r.data.data);
export const bulkImportAdminCompanies = (formData) => api.post('/companies/bulk-import', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data.data);
export const changeCompanyStatus = (id, status) => api.put(`/companies/${id}/status`, { status }).then(r => r.data.data);
export const verifyCompany       = (id, isVerified) => api.put(`/companies/${id}/verify`, { isVerified }).then(r => r.data.data);

export const getUsers       = () => api.get('/users').then(r => r.data.data);
export const addAdminUser   = (data) => api.post('/users', data).then(r => r.data.data);
export const updateUser     = (id, data) => api.put(`/users/${id}`, data).then(r => r.data.data);
export const deleteUser     = (id) => api.delete(`/users/${id}`).then(r => r.data.data);
export const changeUserRole = (id, role) => api.put(`/users/${id}/role`, { role }).then(r => r.data.data);

export const getPendingReviews = () => api.get('/reviews').then(r => r.data.data);
export const approveReview     = (id) => api.put(`/reviews/${id}/approve`).then(r => r.data.data);

export const getEmployees = () => api.get('/employees').then(r => r.data.data);
export const addEmployee  = (data) => api.post('/employees', data).then(r => r.data.data);
