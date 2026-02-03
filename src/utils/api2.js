import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Gunakan Interceptor untuk menyisipkan Token secara otomatis
// Ini memperbaiki masalah "Unauthorized" karena token akan selalu dikirim jika ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchFruits = async () => {
  const response = await api.get('/fruits');
  // Axios menyimpan data di properti .data
  return response.data.map(fruit => ({
    ...fruit,
    price: parseFloat(fruit.price),
    original_price: fruit.original_price ? parseFloat(fruit.original_price) : null
  }));
};

export const fetchCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (item) => {
  const response = await api.post('/cart', item);
  return response.data;
};

export const updateCartItem = async (id, quantity) => {
  const response = await api.put(`/cart/${id}`, { quantity });
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};

export const checkout = async (data) => {
  const response = await api.post('/checkout', data);
  return response.data;
};

export default api;
