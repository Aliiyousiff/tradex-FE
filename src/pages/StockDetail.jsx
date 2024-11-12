import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Hooks for accessing location and navigating
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registering the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockDetail = () => {
  const location = useLocation(); // Access the location prop
  const navigate = useNavigate(); // Hook for navigation
  const [stock, setStock] = useState(null);

  // Extract stock data from location state (passed from Market page)
  useEffect(() => {
    if (location.state && location.state.stock) {
      setStock(location.state.stock);
    } else {
      navigate('/market'); // If no stock data, redirect to Market page
    }
  }, [location, navigate]);

  if (!stock) {
    return <div>Loading...</div>;
  }

  // Prepare data for the chart
  const chartData = {
    labels: stock.priceHistory.map((entry) => entry.date),
    datasets: [
      {
        label: `${stock.name} Price History`,
        data: stock.priceHistory.map((entry) => entry.price),
        fill: false,
        borderColor: '#27AE60',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="stock-detail-page">
      <button onClick={() => navigate('/market')}>Back to Market</button>

      <h2>
        {stock.name} ({stock.symbol})
      </h2>
      <div className="stock-info">
        <p>Current Price: ${stock.price}</p>
        <p>Market Cap: ${stock.marketCap}</p>
        <p>Volume: {stock.volume}</p>
      </div>

      <h3>Price History (Past 3 Months)</h3>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default StockDetail;
