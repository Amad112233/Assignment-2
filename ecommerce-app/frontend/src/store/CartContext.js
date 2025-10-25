import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, setAuthToken } from '../services/api';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setAuthToken(token); }, [token]);

  const loginDemo = async () => {
    const res = await api.post('/auth/login', { email: 'demo@example.com', password: 'password' });
    setToken(res.data.token);
    await fetchCart();
  };

  const fetchCart = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get('/cart');
      setCart(res.data.items || []);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity=1) => {
    await api.post('/cart', { productId, quantity });
    await fetchCart();
  };
  const updateQty = async (productId, quantity) => {
    await api.put(`/cart/${productId}`, { quantity });
    await fetchCart();
  };
  const removeFromCart = async (productId) => {
    await api.delete(`/cart/${productId}`);
    await fetchCart();
  };

  const checkout = async (address='Unknown Street') => {
    const res = await api.post('/orders', { address });
    await fetchCart();
    return res.data;
  };

  const value = { token, setToken, cart, loading, loginDemo, fetchCart, addToCart, updateQty, removeFromCart, checkout };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
