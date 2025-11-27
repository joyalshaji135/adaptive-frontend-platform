import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.response?.status} ${error.config?.url}`, error.message);
    return Promise.reject(error);
  }
);

export const testConnection = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend server is not running');
  }
};

export const userAPI = {
  getPreferences: (userId) => api.get(`/users/${userId}/preferences`),
  savePreferences: (userId, preferences) => 
    api.post(`/users/${userId}/preferences`, preferences),
  addComponent: (userId, component) =>
    api.post(`/users/${userId}/components`, { component }),
  addField: (userId, field) =>
    api.post(`/users/${userId}/fields`, { field })
};

export default api;