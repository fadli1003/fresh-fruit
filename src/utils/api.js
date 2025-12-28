const API_BASE = 'http://localhost:3000/api';

export const checkout = (data) =>
  fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json());

export const updateCartItem = (id, quantity) =>
  fetch(`${API_BASE}/cart/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity })
  }).then(r => r.json());

export const removeFromCart = (id) =>
  fetch(`${API_BASE}/cart/${id}`, { method: 'DELETE' }).then(r => r.json());

export const fetchFruits = () => 
  fetch('http://localhost:3000/api/fruits')
    .then(res => res.json())
    .then(data => data.map(fruit => ({
      ...fruit,
      price: parseFloat(fruit.price),
      original_price: fruit.original_price ? parseFloat(fruit.original_price) : null
    })));


const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchCart = () => 
  fetch('http://localhost:3000/api/cart', {
    headers: getAuthHeader()
  }).then(r => r.json());

export const addToCart = (item) =>
  fetch('http://localhost:3000/api/cart', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(item)
  }).then(r => r.json());