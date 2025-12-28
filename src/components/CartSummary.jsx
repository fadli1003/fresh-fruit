import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const CartSummary = ({ totalItems, totalPrice }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-semibold">${totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">Free</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-green-600">${totalPrice}</span>
          </div>
        </div>
      </div>
      <button 
        onClick={handleCheckout}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
      >
        <CreditCard className="w-5 h-5" />
        <span>Proceed to Checkout</span>
      </button>
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Free shipping on orders over $50</p>
        <p>30-day satisfaction guarantee</p>
      </div>
    </div>
  );
};

export default CartSummary;