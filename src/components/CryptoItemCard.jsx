import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoItemCard = ({ crypto, favoriteList, isAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Example crypto data for the chart
  const cryptoData = crypto.priceHistory || [
    { time: "10 AM", price: crypto.price * 0.98 },
    { time: "11 AM", price: crypto.price * 1.01 },
    { time: "12 PM", price: crypto.price },
    { time: "1 PM", price: crypto.price * 0.99 },
    { time: "2 PM", price: crypto.price * 1.02 },
  ];

  const isFavorite = favoriteList?.some(fav => fav.id === crypto.id);

  // Function to handle buy/sell actions
  const handleAction = async (actionType, crypto) => {
    if (!isAuthenticated) {
      setError('Please log in to perform this action.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`/api/trade/${actionType}-crypto`, {
        userId: 'userId',  // Make sure to replace with actual user ID
        cryptoSymbol: crypto.symbol,
        amount: 1,  // Example amount to buy/sell
        price: crypto.price  // Example price
      });
      alert(`${actionType.toUpperCase()} successful for ${crypto.symbol}!`);
      setLoading(false);
    } catch (error) {
      setError(`Error during ${actionType}: ${error.response?.data?.message || error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="crypto-item-card">
      <h3>{crypto.name} - {crypto.symbol}</h3>
      <p>Price: ${crypto.price.toFixed(2)}</p>

      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={cryptoData}>
          <XAxis dataKey="time" hide />
          <YAxis domain={['auto', 'auto']} hide />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {isAuthenticated && (
        <div>
          <button onClick={() => handleAction('buy', crypto)} disabled={loading}>Buy</button>
          <button onClick={() => handleAction('sell', crypto)} disabled={loading}>Sell</button>
          <button onClick={() => handleAction('favorite', crypto)} disabled={loading}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CryptoItemCard;
