import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex items-center p-6 border-b border-gray-100 last:border-b-0">
      <img 
        src={item.image.trim()} 
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="ml-4 flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm">${item.price} each</p>
      </div>
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="ml-4 text-right">
        <p className="font-semibold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={removeFromCart}
          className="text-red-500 hover:text-red-700 mt-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;