import axios from 'axios';

// Change to your backend IP when running on device (e.g., http://192.168.0.5:3000)
export const API_BASE = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
