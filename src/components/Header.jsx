// fresh-fruit/src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { fetchCart } from '../utils/api';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 💡 Fungsi untuk load user dari localStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Invalid user data in localStorage');
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // 🔁 Load user saat komponen mount & setiap ada perubahan di localStorage
  useEffect(() => {
    loadUser();

    // Opsional: dengarkan perubahan di tab lain
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  // 🛒 Load cart hanya jika user ada
  useEffect(() => {
    if (user) {
      const loadCart = async () => {
        try {
          const data = await fetchCart();
          setCartItems(data);
        } catch (err) {
          console.error('Gagal muat keranjang');
        }
      };
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // ✅ ini yang penting!
    setCartItems([]);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">FreshFruit</span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate('/')} className="font-medium text-gray-600 hover:text-green-600">Shop</button>
            {user && (
              <button onClick={() => navigate('/cart')} className="font-medium text-gray-600 hover:text-green-600">
                Cart ({getTotalItems()})
              </button>
            )}
            <a href="#about_us" className="text-gray-600 hover:text-green-600">About</a>
            <a href="#about_us" className="text-gray-600 hover:text-green-600">Contact</a>
          </nav>

          {/* Auth Area */}
          <div className="flex items-center space-x-4">
            {user && (
              <button 
                onClick={() => navigate('/cart')}
                className="relative p-2 text-gray-600 hover:text-green-600"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}
            
            {user ? (
              // ✅ JIKA SUDAH LOGIN → TOMBOL LOGOUT
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              // ❌ BELUM LOGIN → TOMBOL LOGIN
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-1 text-green-600 hover:text-green-800 font-medium"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}            

            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="font-medium text-gray-600">Shop</button>
              {user && (
                <button onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }} className="font-medium text-gray-600">
                  Cart ({getTotalItems()})
                </button>
              )}
              <a href="#" className="text-gray-600">About</a>
              <a href="#" className="text-gray-600">Contact</a>
              {user ? (
                <button 
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                  className="font-medium text-red-600"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} 
                  className="font-medium text-green-600"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

import { Leaf } from 'lucide-react';
export default Header;