import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import { fetchFruits } from '../utils/api'; // ← tambahkan ini

const ShopPage = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadFruits = async () => {
      try {
        const data = await fetchFruits();
        setFruits(data);
      } catch (err) {
        console.error('Failed to load fruits');
      } finally {
        setLoading(false);
      }
    };
    loadFruits();
  }, []);

  const filteredFruits = fruits.filter(fruit => 
    fruit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fruit.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20">Loading fruits...</div>;
  }

  return (
    <>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ProductGrid filteredFruits={filteredFruits} />
    </>
  );
};

export default ShopPage;