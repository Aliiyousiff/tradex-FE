import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);

  // Extract stock data from location state
  useEffect(() => {
    if (location.state && location.state.stock) {
      setStock(location.state.stock);
    } else {
      navigate('/market');
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
        borderColor: '#4a90e2',
        backgroundColor: '#4a90e2',
        pointRadius: 3,
        pointBackgroundColor: '#34c759',
        pointBorderColor: '#ffffff',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#dcdcdc',
          font: {
            family: 'Roboto',
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#2e2e34',
        titleColor: '#ffffff',
        bodyColor: '#dcdcdc',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#dcdcdc',
          font: {
            family: 'Roboto',
            size: 12,
          },
        },
        grid: {
          color: '#3f3f46',
        },
      },
      y: {
        ticks: {
          color: '#dcdcdc',
          font: {
            family: 'Roboto',
            size: 12,
          },
        },
        grid: {
          color: '#3f3f46',
        },
      },
    },
  };

  return (
    <div className="stock-detail-page">
      <button className="back-button" onClick={() => navigate('/market')}>Back to Market</button>

      <h2 className="stock-detail-title">
        {stock.name} ({stock.symbol})
      </h2>

      <div className="stock-info">
        <p>Current Price: ${stock.price}</p>
        <p>Market Cap: ${stock.marketCap}</p>
        <p>Volume: {stock.volume}</p>
      </div>

      <h3>Price History (Past 3 Months)</h3>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StockDetail;
