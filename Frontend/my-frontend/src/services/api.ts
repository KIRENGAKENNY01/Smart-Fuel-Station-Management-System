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

export const AuthService = {
  login: (data: any) => api.post('/auth/login', data),
  signup: (data: any) => api.post('/auth/signup', data),
  logout: () => api.post('/auth/logout'), // Optionally passes refresh token if managed
};

export const FuelService = {
  getInventory: (stationId: string) => api.get(`/fuel/inventory/${stationId}`),
  getStationPrices: (stationId: string) => api.get(`/fuel/prices/${stationId}`),
};

export const StationService = {
  getNearby: (lat: number, lng: number, radius = 5000) => 
    api.get(`/stations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
  getAll: () => api.get('/stations'),
  getById: (id: string) => api.get(`/stations/${id}`),
};

export const TransactionService = {
  getMyHistory: () => api.get('/transactions/history'),
  getStationSales: (stationId: string) => api.get(`/transactions/station-sales/${stationId}`),
};

export default api;
