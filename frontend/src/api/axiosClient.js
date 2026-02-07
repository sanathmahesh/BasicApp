import axios from 'axios';

const axiosClient = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || '') + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
