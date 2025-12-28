import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Hero = ({ queryPencarian, setQueryPencarian }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-green-400 to-emerald-500 text-white py-20 rounded-2xl mb-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Buah Segar Siap Diantar ke Rumahmu</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Alami, Lezat, dan Segar. Dipetik setiap hari </p>
        
        <div className="max-w-md mx-auto relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari Buah..." 
            value={queryPencarian}
            onChange={(e) => setQueryPencarian(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
          />
        </div>
        
        <button 
          onClick={() => navigate('/cart')}
          className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Lihat Keranjang
        </button>
      </div>
    </section>
  );
};

export default Hero;