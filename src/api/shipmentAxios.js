import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/shipments`;

const shipmentAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

shipmentAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          'x-auth-token': token,
        },
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

shipmentAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default shipmentAxios;
