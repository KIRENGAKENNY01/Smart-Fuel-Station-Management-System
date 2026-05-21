import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('stationId');
      localStorage.removeItem('userEmail');
      window.dispatchEvent(new Event('auth-logout'));
      if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
        const theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.classList.toggle('dark', theme === 'dark');
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

export const AuthService = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  signup: (data: object) => api.post('/auth/signup', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/users/me'),
  updateProfile: (data: { full_name?: string; email?: string }) => api.put('/auth/users/me', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put('/auth/users/me/password', data),
  listUsers: () => api.get('/auth/users'),
  createUser: (data: object) => api.post('/auth/users', data),
  updateUser: (id: string, data: object) => api.put(`/auth/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/auth/users/${id}`),
  suspendUser: (id: string) => api.patch(`/auth/users/${id}/suspend`),
  getPendingManagers: () => api.get('/auth/users/pending/managers'),
  approveManager: (id: string, stationId?: string) =>
    api.patch(`/auth/users/${id}/approve`, { station_id: stationId }),
  rejectManager: (id: string, reason?: string) =>
    api.patch(`/auth/users/${id}/reject`, { reason }),
};

export const FuelService = {
  getInventory: (stationId: string) => api.get(`/fuel/inventory/${stationId}`),
  getStationPrices: (stationId: string) => api.get(`/fuel/prices/${stationId}`),
  getPriceTrend: (stationId: string, fuelType: string, range = '7d') =>
    api.get(`/fuel/price-trend/${stationId}?fuelType=${fuelType}&range=${range}`),
  addSupply: (data: { station_id: string; fuel_type_id: string; liters_added: number }) =>
    api.post('/fuel/supply', data),
  updatePrice: (data: { station_id: string; fuel_type_id: string; price: number }) =>
    api.put('/fuel/price', data),
  setStockLevel: (data: { station_id: string; fuel_type_id: string; liters: number }) =>
    api.put('/fuel/inventory-level', data),
};

export const StationService = {
  getNearby: (lat: number, lon: number, distance = 5000) =>
    api.get(`/stations/nearby?lat=${lat}&lon=${lon}&distance=${distance}`),
  getAll: () => api.get('/stations'),
  getById: (id: string) => api.get(`/stations/${id}`),
  create: (data: object) => api.post('/stations', data),
  update: (id: string, data: object) => api.put(`/stations/${id}`, data),
  remove: (id: string) => api.delete(`/stations/${id}`),
  assignManager: (id: string, managerId: string) =>
    api.patch(`/stations/${id}/assign-manager`, { managerId }),
};

export const TransactionService = {
  create: (data: { stationId: string; fuelType: string; liters: number }) =>
    api.post('/transactions', data),
  getMyHistory: (params?: { page?: number; limit?: number; dateFrom?: string; dateTo?: string }) =>
    api.get('/transactions/history', { params }),
  getAnalytics: () => api.get('/transactions/analytics'),
  getStationSales: (stationId: string, params?: object) =>
    api.get(`/transactions/station-sales/${stationId}`, { params }),
  getAdminStats: (period = 'daily') => api.get('/transactions/admin/stats', { params: { period } }),
  getAllTransactions: (params?: object) => api.get('/transactions/admin/all', { params }),
  getManagerStats: (stationId?: string) =>
    api.get('/transactions/manager/stats', { params: stationId ? { stationId } : {} }),
  confirmPayment: (id: string, email?: string) =>
    api.post(`/transactions/${id}/confirm`, { email }),
  getReceipt: (transactionId: string) => api.get(`/transactions/${transactionId}/receipt`),
  downloadReceipt: (transactionId: string) =>
    api.get(`/transactions/${transactionId}/receipt/download`, { responseType: 'blob' }),
  emailReceipt: (transactionId: string, email?: string) =>
    api.post(`/transactions/${transactionId}/receipt/email`, { email }),
};

export const ReportService = {
  downloadDriver: (format = 'json', dateFrom?: string, dateTo?: string) =>
    api.get('/reports/driver', { params: { format, dateFrom, dateTo }, responseType: 'blob' }),
  downloadAdmin: (period = 'daily') =>
    api.get('/reports/admin', { params: { period }, responseType: 'blob' }),
};

export const NotificationService = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
};

const GEOAPIFY_API_KEY = "a42cdc1077d542239ac98d3e485a0865";

export const GeocodingService = {
  reverse: async (lat: number, lon: number) => {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`;
    const res = await axios.get(url);
    const feature = res.data.features?.[0]?.properties;
    if (!feature) return null;
    return {
      country: feature.country || null,
      province: feature.state || feature.region || null,
      district: feature.district || feature.city || null,
      sector: feature.suburb || feature.neighbourhood || feature.village || null,
      formatted_address: feature.formatted || null,
    };
  },
};

export default api;
