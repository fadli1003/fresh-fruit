import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { addToCart as apiAddToCart } from '../utils/api';

const ProductGrid = ({ filteredFruits }) => {
  const handleAddToCart = async (fruit) => {
    try {
      await apiAddToCart({
        id: fruit.id,
        name: fruit.name,
        price: fruit.price,
        image: fruit.image.trim(),
        description: fruit.description,
        quantity: 1
      });
      toast.success(`${fruit.name} added to cart!`);
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-green-800">Fresh Fruits</h2>
        <p className="text-gray-600">{filteredFruits.length} products found</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFruits.map((fruit) => (
          <div key={fruit.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img 
                src={fruit.image.trim()} 
                alt={fruit.name}
                className="w-full h-64 object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              {fruit.originalPrice > fruit.price && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  Sale
                </div> 
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{fruit.name}</h3>
              <p className="text-gray-600 mb-4">{fruit.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(fruit.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({fruit.reviews})</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">${fruit.price}</span>
                  {fruit.originalPrice > fruit.price && (
                    <span className="text-gray-400 line-through">${fruit.originalPrice}</span>
                  )}
                </div>
                <button 
                  onClick={() => handleAddToCart(fruit)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;