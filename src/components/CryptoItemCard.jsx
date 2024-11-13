import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CryptoItemCard = ({ crypto, onBuy, onSell, onFavorite, favoriteList, isAuthenticated }) => {
  // Default price history for demo purposes
  const cryptoData = crypto.priceHistory || [
    { time: "10 AM", price: crypto.price * 0.98 },
    { time: "11 AM", price: crypto.price * 1.01 },
    { time: "12 PM", price: crypto.price },
    { time: "1 PM", price: crypto.price * 0.99 },
    { time: "2 PM", price: crypto.price * 1.02 },
  ];

  // Check if the crypto is in the user's favorites
  const isFavorite = favoriteList?.some(fav => fav.id === crypto.id);

  return (
    <div className="crypto-item-card">
      <div className="crypto-info">
        <h3>{crypto.name}</h3>
        <p>{crypto.symbol}</p>
        <p>Price: ${crypto.price.toFixed(2)}</p>
      </div>

      <div className="crypto-chart">
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={cryptoData}>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: "#2e2e34", color: "#dcdcdc" }}
              labelStyle={{ color: "#ffffff" }}
            />
            <Line type="monotone" dataKey="price" stroke="#4a90e2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="button-container">
        {/* Show Buy, Sell, and Favorite buttons only for authenticated users */}
        {isAuthenticated ? (
          <>
            {/* Buy Button */}
            <button className="buy-button" onClick={() => onBuy(crypto)}>Buy</button>

            {/* Sell Button */}
            <button className="sell-button" onClick={() => onSell(crypto)}>Sell</button>

            {/* Favorite Button (toggle state) */}
            <button
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={() => onFavorite(crypto)}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </>
        ) : (
          <p>Please log in to buy, sell, or favorite this cryptocurrency.</p>
        )}
      </div>
    </div>
  );
};

export default CryptoItemCard;
