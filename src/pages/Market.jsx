import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StockItemCard from '../components/StockItemCard';

const Market = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fake stock data for the market (with 17 total stocks now)
  const fakeStockData = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 145.64,
      volume: 15000000,
      marketCap: 2400000000000,
      priceHistory: [
        { date: '2024-08-01', price: 142.5 },
        { date: '2024-08-02', price: 145.0 },
        { date: '2024-08-03', price: 146.0 },
        { date: '2024-08-04', price: 147.0 },
        { date: '2024-08-05', price: 145.5 },
        { date: '2024-08-06', price: 146.2 },
        { date: '2024-08-07', price: 145.8 },
        { date: '2024-08-08', price: 147.3 },
        { date: '2024-08-09', price: 149.0 },
        { date: '2024-08-10', price: 150.5 }
      ]
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 2750.25,
      volume: 1200000,
      marketCap: 1800000000000,
      priceHistory: [
        { date: '2024-08-01', price: 2715.0 },
        { date: '2024-08-02', price: 2730.5 },
        { date: '2024-08-03', price: 2750.0 },
        { date: '2024-08-04', price: 2785.0 },
        { date: '2024-08-05', price: 2800.0 },
        { date: '2024-08-06', price: 2820.0 },
        { date: '2024-08-07', price: 2850.5 },
        { date: '2024-08-08', price: 2870.0 },
        { date: '2024-08-09', price: 2890.0 },
        { date: '2024-08-10', price: 2905.5 }
      ]
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 300.25,
      volume: 2500000,
      marketCap: 2300000000000,
      priceHistory: [
        { date: '2024-08-01', price: 295.0 },
        { date: '2024-08-02', price: 298.5 },
        { date: '2024-08-03', price: 300.0 },
        { date: '2024-08-04', price: 305.0 },
        { date: '2024-08-05', price: 307.0 },
        { date: '2024-08-06', price: 310.0 },
        { date: '2024-08-07', price: 312.5 },
        { date: '2024-08-08', price: 315.0 },
        { date: '2024-08-09', price: 320.0 },
        { date: '2024-08-10', price: 325.0 }
      ]
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 830.12,
      volume: 3500000,
      marketCap: 800000000000,
      priceHistory: [
        { date: '2024-08-01', price: 810.0 },
        { date: '2024-08-02', price: 820.0 },
        { date: '2024-08-03', price: 830.0 },
        { date: '2024-08-04', price: 840.0 },
        { date: '2024-08-05', price: 850.0 },
        { date: '2024-08-06', price: 860.0 },
        { date: '2024-08-07', price: 870.0 },
        { date: '2024-08-08', price: 880.0 },
        { date: '2024-08-09', price: 890.0 },
        { date: '2024-08-10', price: 900.0 }
      ]
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 3550.45,
      volume: 1000000,
      marketCap: 1790000000000,
      priceHistory: [
        { date: '2024-08-01', price: 3500.0 },
        { date: '2024-08-02', price: 3520.0 },
        { date: '2024-08-03', price: 3550.0 },
        { date: '2024-08-04', price: 3600.0 },
        { date: '2024-08-05', price: 3625.0 },
        { date: '2024-08-06', price: 3650.0 },
        { date: '2024-08-07', price: 3700.0 },
        { date: '2024-08-08', price: 3750.0 },
        { date: '2024-08-09', price: 3800.0 },
        { date: '2024-08-10', price: 3850.0 }
      ]
    },
    {
      symbol: 'NFLX',
      name: 'Netflix Inc.',
      price: 520.1,
      volume: 4000000,
      marketCap: 230000000000,
      priceHistory: [
        { date: '2024-08-01', price: 510.0 },
        { date: '2024-08-02', price: 515.0 },
        { date: '2024-08-03', price: 520.0 },
        { date: '2024-08-04', price: 525.0 },
        { date: '2024-08-05', price: 530.0 },
        { date: '2024-08-06', price: 535.0 },
        { date: '2024-08-07', price: 540.0 },
        { date: '2024-08-08', price: 545.0 },
        { date: '2024-08-09', price: 550.0 },
        { date: '2024-08-10', price: 555.0 }
      ]
    },
    {
      symbol: 'FB',
      name: 'Meta Platforms Inc.',
      price: 350.5,
      volume: 2800000,
      marketCap: 1000000000000,
      priceHistory: [
        { date: '2024-08-01', price: 340.0 },
        { date: '2024-08-02', price: 345.0 },
        { date: '2024-08-03', price: 350.0 },
        { date: '2024-08-04', price: 355.0 },
        { date: '2024-08-05', price: 360.0 },
        { date: '2024-08-06', price: 365.0 },
        { date: '2024-08-07', price: 370.0 },
        { date: '2024-08-08', price: 375.0 },
        { date: '2024-08-09', price: 380.0 },
        { date: '2024-08-10', price: 385.0 }
      ]
    },
    // Additional 3 stocks
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 670.32,
      volume: 5000000,
      marketCap: 1400000000000,
      priceHistory: [
        { date: '2024-08-01', price: 660.0 },
        { date: '2024-08-02', price: 670.0 },
        { date: '2024-08-03', price: 680.0 },
        { date: '2024-08-04', price: 690.0 },
        { date: '2024-08-05', price: 700.0 },
        { date: '2024-08-06', price: 710.0 },
        { date: '2024-08-07', price: 720.0 },
        { date: '2024-08-08', price: 730.0 },
        { date: '2024-08-09', price: 740.0 },
        { date: '2024-08-10', price: 750.0 }
      ]
    },
    {
      symbol: 'DIS',
      name: 'Walt Disney Company',
      price: 200.45,
      volume: 3000000,
      marketCap: 220000000000,
      priceHistory: [
        { date: '2024-08-01', price: 195.0 },
        { date: '2024-08-02', price: 200.0 },
        { date: '2024-08-03', price: 205.0 },
        { date: '2024-08-04', price: 210.0 },
        { date: '2024-08-05', price: 215.0 },
        { date: '2024-08-06', price: 220.0 },
        { date: '2024-08-07', price: 225.0 },
        { date: '2024-08-08', price: 230.0 },
        { date: '2024-08-09', price: 235.0 },
        { date: '2024-08-10', price: 240.0 }
      ]
    },
    {
      symbol: 'BA',
      name: 'Boeing Company',
      price: 215.75,
      volume: 6000000,
      marketCap: 1200000000000,
      priceHistory: [
        { date: '2024-08-01', price: 210.0 },
        { date: '2024-08-02', price: 215.0 },
        { date: '2024-08-03', price: 220.0 },
        { date: '2024-08-04', price: 225.0 },
        { date: '2024-08-05', price: 230.0 },
        { date: '2024-08-06', price: 235.0 },
        { date: '2024-08-07', price: 240.0 },
        { date: '2024-08-08', price: 245.0 },
        { date: '2024-08-09', price: 250.0 },
        { date: '2024-08-10', price: 255.0 }
      ]
    }
  ]

  useEffect(() => {
    setStocks(fakeStockData)
    setLoading(false)
  }, [])
// Handle Buy action
const handleBuy = async (stock) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/trade/create",
      {
        symbol: stock.symbol,
        quantity: 1,
        price: stock.price,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Trade created successfully:", response.data);
    alert("Stock purchased successfully!");
  } catch (error) {
    console.error("Error buying stock:", error.response?.data || error.message);
    alert("Failed to purchase stock.");
  }
};

// Handle Sell action
const handleSell = async (stock) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/trade/create",
      {
        symbol: stock.symbol,
        quantity: -1, // Negative quantity to indicate sell
        price: stock.price,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Stock sold successfully:", response.data.message);
    alert("Stock sold successfully!");
  } catch (error) {
    console.error("Error selling stock:", error.response?.data || error.message);
    alert("Failed to sell stock.");
  }
};

// Handle Add to Favorites action
const handleAddToFavorites = async (stock) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/trade/favorites/add",
      {
        symbol: stock.symbol,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data.message);
    alert(response.data.message);
  } catch (error) {
    console.error("Error adding to favorites:", error.response?.data || error.message);
    alert("Failed to add to favorites.");
  }
};

// Navigate to StockDetail page
const handleStockSelect = (stock) => {
  navigate('/stockdetail', { state: { stock } });
};

// Loading and error handling
if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

return (
  <div>
    <h1>Stock Market</h1>
    <div className="stock-list">
      {stocks.length > 0 ? (
        stocks.map((stock) => (
          <div key={stock.symbol} className="stock-item">
            <StockItemCard
              stock={stock}
              onBuy={handleBuy}
              onSell={handleSell}
              onFavorite={handleAddToFavorites}
            />
            <button onClick={() => handleStockSelect(stock)}>View Details</button>
          </div>
        ))
      ) : (
        <div>No stocks available</div>
      )}
    </div>
  </div>
);
};

export default Market;