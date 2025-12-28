import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const handlePaymentSubmit = async (e) => {
  e.preventDefault();
  try {
    const orderData = {
      shippingInfo,
      paymentInfo,
      items: cartItems,
      total: parseFloat(total)
    };
    const res = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const result = await res.json();
    if (result.success) {
      setCheckoutStep('confirmation');
      // Kosongkan keranjang di UI
      setCartItems([]);
    }
  } catch (err) {
    alert('Payment failed');
  }
};

const CheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-green-800 mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6 text-lg">Thank you for your order. Your fruits will be delivered soon!</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;