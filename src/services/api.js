import Axios from 'axios';

export const BASE_URL = 'http://localhost:4000'; // Backend server URL

const axiosClient = Axios.create({ baseURL: BASE_URL });

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token; // Use 'x-auth-token' header for JWT token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;