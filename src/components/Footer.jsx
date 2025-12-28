import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 text-white py-12 mt-16" id='about_us'>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FreshFruit</span>
            </div>
            <p className="text-gray-400">Your trusted source for fresh, organic fruits delivered straight to your door.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => navigate('/')} className="hover:text-white">Shop</button></li>
              <li><button onClick={() => navigate('/cart')} className="hover:text-white">Cart</button></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Berries</a></li>
              <li><a href="#" className="hover:text-white">Tropical Fruits</a></li>
              <li><a href="#" className="hover:text-white">Apples & Pears</a></li>
              <li><a href="#" className="hover:text-white">Citrus Fruits</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>Email: info@freshfruit.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Fruit Street, Fresh City</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FreshFruit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;