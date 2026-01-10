import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { fetchCart, updateCartItem, removeFromCart, checkout } from '../utils/api2';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      // console.log(data)
      setCartItems(data);
    } catch (err) {
      toast.error('Failed to load cart', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity === 0) {
      await handleRemove(id);
      return;
    }
     // 1. Simpan data lama untuk backup jika API gagal
    const previousCart = [...cartItems];

    // 2. Optimistic Update (Update UI secara instan)
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );

    try {
      // const updated = await updateCartItem(id, newQuantity);
      // setCartItems(updated);
      const response = await updateCartItem(id, newQuantity);

      if (Array.isArray(response)) {
        setCartItems(response);
      } else if (response && Array.isArray(response.cart)) {
        setCartItems(response.cart);
      }
    } catch (err) {
      //rollback jika gagal
      setCartItems(previousCart);
      toast.error('Failed to update quantity', err.message);
    }
  };

  const handleRemove = async (id) => {
    try {
      const result = await removeFromCart(id);
      setCartItems(result.cart);
      toast.success('Item removed');
    } catch (err) {
      toast.error('Failed to remove item', err.message);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    navigate('/payment');
  };

  if (loading) {
    return <div className="text-center py-12">Loading cart...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-800">Your Shopping Cart</h1>
        <button 
          onClick={() => navigate('/')}
          className="text-green-600 hover:text-green-800 font-medium"
        >
          ← Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some delicious fruits to your cart!</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={handleUpdateQuantity}
                  removeFromCart={() => handleRemove(item.id)}
                />
              ))} */}
              {Array.isArray(cartItems) && cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={handleUpdateQuantity}
                  removeFromCart={() => handleRemove(item.id)}
                />
              ))}
            </div>
          </div>
          <CartSummary totalItems={getTotalItems()} totalPrice={getTotalPrice()} />
        </div>
      )}
    </div>
  );
};

export default CartPage;