import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header1';
import Footer from './components/Footer';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import AdminLogin from './pages/auth/AdminLogin';
import AdminPage from './pages/admin/AdminPage';
import AuthPage from './pages/auth/AuthPage';
import PaymentPage from './components/PaymentPage';
import Test from './test/test';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            
            <Route path="/" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} />

            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPage />} />

            <Route path='test' element={<Test />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;