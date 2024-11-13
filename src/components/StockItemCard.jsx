import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// StockItemCard Component
const StockItemCard = ({ stock, onBuy, onSell, onFavorite, isAuthenticated, favoriteList }) => {
  // Default stock price history for demo purposes
  const stockData = stock.history || [
    { time: '10 AM', price: stock.price * 0.98 },
    { time: '11 AM', price: stock.price * 1.01 },
    { time: '12 PM', price: stock.price },
    { time: '1 PM', price: stock.price * 0.99 },
    { time: '2 PM', price: stock.price * 1.02 }
  ];

  // Check if the stock is in the user's favorites
  const isFavorite = favoriteList?.some((fav) => fav.id === stock.id);

  return (
    <div className="stock-item-card">
      <div className="stock-info">
        <h3>{stock.name}</h3>
        <p>{stock.symbol}</p>
        <p>Price: ${stock.price.toFixed(2)}</p>
      </div>

      <div className="stock-chart">
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={stockData}>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: '#2e2e34', color: '#dcdcdc' }}
              labelStyle={{ color: '#ffffff' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4a90e2"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="button-container">
        {/* Conditionally render Buy, Sell, and Favorite buttons only for authenticated users */}
        {isAuthenticated ? (
          <>
            {/* Buy Button */}
            <button className="buy-button" onClick={() => onBuy(stock)}>
              Buy
            </button>

            {/* Sell Button */}
            <button className="sell-button" onClick={() => onSell(stock)}>
              Sell
            </button>

            {/* Favorite Button (toggle state) */}
            <button
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={() => onFavorite(stock)}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </>
        ) : (
          <p>Please log in to buy, sell, or favorite this stock.</p>
        )}
      </div>
    </div>
  );
};

export default StockItemCard;
