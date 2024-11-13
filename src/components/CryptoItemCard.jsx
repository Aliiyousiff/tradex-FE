import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CryptoItemCard = ({ crypto, onBuy, onSell, onFavorite }) => {
  const cryptoData = crypto.priceHistory || [
    { time: "10 AM", price: crypto.price * 0.98 },
    { time: "11 AM", price: crypto.price * 1.01 },
    { time: "12 PM", price: crypto.price },
    { time: "1 PM", price: crypto.price * 0.99 },
    { time: "2 PM", price: crypto.price * 1.02 },
  ];

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
        <button className="buy-button" onClick={() => onBuy(crypto)}>Buy</button>
        <button className="sell-button" onClick={() => onSell(crypto)}>Sell</button>
        <button className="favorite-button" onClick={() => onFavorite(crypto)}>Favorite</button>
      </div>
    </div>
  );
};

export default CryptoItemCard;
