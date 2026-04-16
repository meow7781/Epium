import axios from 'axios';

// Ensure this matches where your backend is running
// If using Android emulator, 10.0.2.2 usually connects to localhost
// For Expo Go on real device, you need the local IP address of your machine e.g. 192.168.1.X
const BASE_URL = 'http://localhost:3000'; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductDetails = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

export const translateText = async (text) => {
  const response = await api.post('/translate', { text });
  return response.data;
};

export default api;
