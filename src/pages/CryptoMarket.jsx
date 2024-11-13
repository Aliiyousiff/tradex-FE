import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoItemCard from '../components/CryptoItemCard'; // Crypto item card component
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoMarket = ({ onBuy, onSell, onFavorite }) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fakeCryptoData = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 45000.0,
      volume: 1000000,
      marketCap: 850000000000,
      priceHistory: [
        { date: '2024-08-01', price: 44000 },
        { date: '2024-08-02', price: 44500 },
        { date: '2024-08-03', price: 45000 },
        { date: '2024-08-04', price: 46000 },
        { date: '2024-08-05', price: 47000 },
        { date: '2024-08-06', price: 48000 },
        { date: '2024-08-07', price: 48500 },
        { date: '2024-08-08', price: 49000 },
        { date: '2024-08-09', price: 49500 },
        { date: '2024-08-10', price: 50000 },
      ],
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3200.0,
      volume: 1200000,
      marketCap: 400000000000,
      priceHistory: [
        { date: '2024-08-01', price: 3100 },
        { date: '2024-08-02', price: 3150 },
        { date: '2024-08-03', price: 3200 },
        { date: '2024-08-04', price: 3300 },
        { date: '2024-08-05', price: 3400 },
        { date: '2024-08-06', price: 3450 },
        { date: '2024-08-07', price: 3500 },
        { date: '2024-08-08', price: 3550 },
        { date: '2024-08-09', price: 3600 },
        { date: '2024-08-10', price: 3650 },
      ],
    },
    {
      symbol: 'LTC',
      name: 'Litecoin',
      price: 150.0,
      volume: 2000000,
      marketCap: 10000000000,
      priceHistory: [
        { date: '2024-08-01', price: 140 },
        { date: '2024-08-02', price: 145 },
        { date: '2024-08-03', price: 150 },
        { date: '2024-08-04', price: 155 },
        { date: '2024-08-05', price: 160 },
        { date: '2024-08-06', price: 162 },
        { date: '2024-08-07', price: 164 },
        { date: '2024-08-08', price: 168 },
        { date: '2024-08-09', price: 170 },
        { date: '2024-08-10', price: 175 },
      ],
    },
    {
      symbol: 'DOGE',
      name: 'Dogecoin',
      price: 0.07,
      volume: 100000000,
      marketCap: 10000000000,
      priceHistory: [
        { date: '2024-08-01', price: 0.065 },
        { date: '2024-08-02', price: 0.067 },
        { date: '2024-08-03', price: 0.07 },
        { date: '2024-08-04', price: 0.075 },
        { date: '2024-08-05', price: 0.08 },
        { date: '2024-08-06', price: 0.085 },
        { date: '2024-08-07', price: 0.09 },
        { date: '2024-08-08', price: 0.095 },
        { date: '2024-08-09', price: 0.1 },
        { date: '2024-08-10', price: 0.12 },
      ],
    },
    {
      symbol: 'XRP',
      name: 'Ripple',
      price: 0.55,
      volume: 5000000,
      marketCap: 30000000000,
      priceHistory: [
        { date: '2024-08-01', price: 0.50 },
        { date: '2024-08-02', price: 0.52 },
        { date: '2024-08-03', price: 0.55 },
        { date: '2024-08-04', price: 0.57 },
        { date: '2024-08-05', price: 0.60 },
        { date: '2024-08-06', price: 0.62 },
        { date: '2024-08-07', price: 0.64 },
        { date: '2024-08-08', price: 0.66 },
        { date: '2024-08-09', price: 0.68 },
        { date: '2024-08-10', price: 0.70 },
      ],
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      price: 1.5,
      volume: 5000000,
      marketCap: 50000000000,
      priceHistory: [
        { date: '2024-08-01', price: 1.45 },
        { date: '2024-08-02', price: 1.48 },
        { date: '2024-08-03', price: 1.50 },
        { date: '2024-08-04', price: 1.52 },
        { date: '2024-08-05', price: 1.55 },
        { date: '2024-08-06', price: 1.60 },
        { date: '2024-08-07', price: 1.62 },
        { date: '2024-08-08', price: 1.65 },
        { date: '2024-08-09', price: 1.70 },
        { date: '2024-08-10', price: 1.75 },
      ],
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 20.0,
      volume: 100000000,
      marketCap: 100000000000,
      priceHistory: [
        { date: '2024-08-01', price: 18.5 },
        { date: '2024-08-02', price: 19.0 },
        { date: '2024-08-03', price: 20.0 },
        { date: '2024-08-04', price: 21.0 },
        { date: '2024-08-05', price: 22.0 },
        { date: '2024-08-06', price: 23.0 },
        { date: '2024-08-07', price: 24.0 },
        { date: '2024-08-08', price: 25.0 },
        { date: '2024-08-09', price: 26.0 },
        { date: '2024-08-10', price: 27.0 },
      ],
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      price: 6.8,
      volume: 10000000,
      marketCap: 7500000000,
      priceHistory: [
        { date: '2024-08-01', price: 6.5 },
        { date: '2024-08-02', price: 6.6 },
        { date: '2024-08-03', price: 6.7 },
        { date: '2024-08-04', price: 6.8 },
        { date: '2024-08-05', price: 6.9 },
        { date: '2024-08-06', price: 7.0 },
        { date: '2024-08-07', price: 7.1 },
        { date: '2024-08-08', price: 7.2 },
        { date: '2024-08-09', price: 7.3 },
        { date: '2024-08-10', price: 7.4 },
      ],
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      price: 7.3,
      volume: 15000000,
      marketCap: 5500000000,
      priceHistory: [
        { date: '2024-08-01', price: 6.9 },
        { date: '2024-08-02', price: 7.0 },
        { date: '2024-08-03', price: 7.2 },
        { date: '2024-08-04', price: 7.4 },
        { date: '2024-08-05', price: 7.6 },
        { date: '2024-08-06', price: 7.7 },
        { date: '2024-08-07', price: 7.9 },
        { date: '2024-08-08', price: 8.0 },
        { date: '2024-08-09', price: 8.1 },
        { date: '2024-08-10', price: 8.3 },
      ],
    },
  ];

  useEffect(() => {
    setCryptos(fakeCryptoData);
    setLoading(false);
  }, []);

  const handleCryptoSelect = (crypto) => {
    navigate('/cryptodetail', { state: { crypto } }); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Crypto Market</h1>
      <div className="crypto-list">
        {cryptos.length > 0 ? (
          cryptos.map((crypto) => (
            <div key={crypto.symbol} className="crypto-item">
              <CryptoItemCard
                crypto={crypto}
                onBuy={onBuy}
                onSell={onSell}
                onFavorite={onFavorite}
              />
              <button onClick={() => handleCryptoSelect(crypto)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <div>No cryptocurrencies available</div>
        )}
      </div>
    </div>
  );
};

export default CryptoMarket;
