import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StockItemCard = ({ stock, onBuy, onSell, onFavorite }) => {
  if (!stock) return null;

  const stockData = stock.history || [
    { time: "10 AM", price: stock.price * 0.98 },
    { time: "11 AM", price: stock.price * 1.01 },
    { time: "12 PM", price: stock.price },
    { time: "1 PM", price: stock.price * 0.99 },
    { time: "2 PM", price: stock.price * 1.02 },
  ];

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
              contentStyle={{ backgroundColor: "#2e2e34", color: "#dcdcdc" }}
              labelStyle={{ color: "#ffffff" }}
            />
            <Line type="monotone" dataKey="price" stroke="#4a90e2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="button-container">
        <button className="buy-button" onClick={() => onBuy(stock)}>Buy</button>
        <button className="sell-button" onClick={() => onSell(stock)}>Sell</button>
        <button className="favorite-button" onClick={() => onFavorite(stock)}>Favorite</button>
      </div>
    </div>
  );
};

export default StockItemCard;
