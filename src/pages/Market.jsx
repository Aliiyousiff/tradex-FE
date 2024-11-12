import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import StockItemCard from '../components/StockItemCard'

// Registering the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Market = ({ onBuy, onSell, onFavorite }) => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedStock, setSelectedStock] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Fake stock data for the market (more than 20 stocks)
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
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 950.15,
      volume: 4000000,
      marketCap: 900000000000,
      priceHistory: [
        { date: '2024-08-01', price: 930.0 },
        { date: '2024-08-02', price: 940.5 },
        { date: '2024-08-03', price: 950.0 },
        { date: '2024-08-04', price: 960.0 },
        { date: '2024-08-05', price: 965.0 },
        { date: '2024-08-06', price: 970.5 },
        { date: '2024-08-07', price: 980.0 },
        { date: '2024-08-08', price: 985.0 },
        { date: '2024-08-09', price: 990.0 },
        { date: '2024-08-10', price: 995.0 }
      ]
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 3345.35,
      volume: 3200000,
      marketCap: 1700000000000,
      priceHistory: [
        { date: '2024-08-01', price: 3310.0 },
        { date: '2024-08-02', price: 3320.5 },
        { date: '2024-08-03', price: 3345.0 },
        { date: '2024-08-04', price: 3360.0 },
        { date: '2024-08-05', price: 3375.5 },
        { date: '2024-08-06', price: 3390.0 },
        { date: '2024-08-07', price: 3405.5 },
        { date: '2024-08-08', price: 3420.0 },
        { date: '2024-08-09', price: 3435.5 },
        { date: '2024-08-10', price: 3450.0 }
      ]
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 380.78,
      volume: 2500000,
      marketCap: 1050000000000,
      priceHistory: [
        { date: '2024-08-01', price: 375.0 },
        { date: '2024-08-02', price: 380.0 },
        { date: '2024-08-03', price: 385.0 },
        { date: '2024-08-04', price: 388.0 },
        { date: '2024-08-05', price: 390.5 },
        { date: '2024-08-06', price: 395.0 },
        { date: '2024-08-07', price: 397.0 },
        { date: '2024-08-08', price: 400.0 },
        { date: '2024-08-09', price: 405.5 },
        { date: '2024-08-10', price: 410.0 }
      ]
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: 301.1,
      volume: 2000000,
      marketCap: 2300000000000,
      priceHistory: [
        { date: '2024-08-01', price: 295.0 },
        { date: '2024-08-02', price: 298.0 },
        { date: '2024-08-03', price: 300.0 },
        { date: '2024-08-04', price: 303.5 },
        { date: '2024-08-05', price: 305.0 },
        { date: '2024-08-06', price: 308.5 },
        { date: '2024-08-07', price: 310.0 },
        { date: '2024-08-08', price: 312.0 },
        { date: '2024-08-09', price: 315.0 },
        { date: '2024-08-10', price: 320.0 }
      ]
    },
    {
      symbol: 'NFLX',
      name: 'Netflix Inc.',
      price: 563.45,
      volume: 1300000,
      marketCap: 1300000000000,
      priceHistory: [
        { date: '2024-08-01', price: 555.0 },
        { date: '2024-08-02', price: 560.5 },
        { date: '2024-08-03', price: 563.0 },
        { date: '2024-08-04', price: 565.0 },
        { date: '2024-08-05', price: 567.5 },
        { date: '2024-08-06', price: 570.0 },
        { date: '2024-08-07', price: 572.5 },
        { date: '2024-08-08', price: 575.0 },
        { date: '2024-08-09', price: 577.5 },
        { date: '2024-08-10', price: 580.0 }
      ]
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 295.75,
      volume: 2200000,
      marketCap: 700000000000,
      priceHistory: [
        { date: '2024-08-01', price: 290.0 },
        { date: '2024-08-02', price: 292.0 },
        { date: '2024-08-03', price: 295.0 },
        { date: '2024-08-04', price: 298.0 },
        { date: '2024-08-05', price: 300.0 },
        { date: '2024-08-06', price: 305.0 },
        { date: '2024-08-07', price: 310.0 },
        { date: '2024-08-08', price: 315.0 },
        { date: '2024-08-09', price: 318.0 },
        { date: '2024-08-10', price: 320.0 }
      ]
    },
    // Additional stocks added below
    {
      symbol: 'INTC',
      name: 'Intel Corporation',
      price: 52.45,
      volume: 3000000,
      marketCap: 220000000000,
      priceHistory: [
        { date: '2024-08-01', price: 50.0 },
        { date: '2024-08-02', price: 51.5 },
        { date: '2024-08-03', price: 52.0 },
        { date: '2024-08-04', price: 53.0 },
        { date: '2024-08-05', price: 54.0 },
        { date: '2024-08-06', price: 55.0 },
        { date: '2024-08-07', price: 56.0 },
        { date: '2024-08-08', price: 57.5 },
        { date: '2024-08-09', price: 58.0 },
        { date: '2024-08-10', price: 59.0 }
      ]
    },
    {
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      price: 115.8,
      volume: 2200000,
      marketCap: 180000000000,
      priceHistory: [
        { date: '2024-08-01', price: 110.0 },
        { date: '2024-08-02', price: 112.5 },
        { date: '2024-08-03', price: 113.5 },
        { date: '2024-08-04', price: 114.0 },
        { date: '2024-08-05', price: 115.0 },
        { date: '2024-08-06', price: 116.0 },
        { date: '2024-08-07', price: 118.0 },
        { date: '2024-08-08', price: 119.0 },
        { date: '2024-08-09', price: 120.0 },
        { date: '2024-08-10', price: 121.5 }
      ]
    }
  ]

  useEffect(() => {
    setStocks(fakeStockData)
    setLoading(false)
  }, [])

  const handleStockSelect = (stock) => {
    setSelectedStock(stock)
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedStock(null)
  }

  // Prepare data for chart
  const chartData = {
    labels: selectedStock?.priceHistory?.map((entry) => entry.date),
    datasets: [
      {
        label: `${selectedStock?.name} Price (Past 3 Months)`,
        data: selectedStock?.priceHistory?.map((entry) => entry.price),
        fill: false,
        borderColor: '#27AE60',
        tension: 0.1
      }
    ]
  }

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Stock Market</h1>
      <div className="stock-list">
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <div key={stock.symbol} className="stock-item">
              <StockItemCard
                stock={stock}
                onBuy={onBuy}
                onSell={onSell}
                onFavorite={onFavorite}
              />
              <button onClick={() => handleStockSelect(stock)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <div>No stocks available</div>
        )}
      </div>

      {showDetails && selectedStock && (
        <div className="stock-details">
          <button onClick={handleCloseDetails}>Close</button>
          <h2>
            {selectedStock.name} ({selectedStock.symbol})
          </h2>
          <div className="stock-info">
            <p>Current Price: ${selectedStock.price}</p>
            <p>Market Cap: ${selectedStock.marketCap}</p>
            <p>Volume: {selectedStock.volume}</p>
          </div>

          <h3>Price History (Past 3 Months)</h3>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } }
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Market
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate for navigation
import axios from 'axios'
import StockItemCard from '../components/StockItemCard' // Assume this is a separate component

const Market = ({ onBuy, onSell, onFavorite }) => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate() // Initialize useNavigate

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

  // Navigate to StockDetail page with the selected stock
  const handleStockSelect = (stock) => {
    navigate('/stockdetail', { state: { stock } }) // Pass stock data to the detail page
  }

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Stock Market</h1>
      <div className="stock-list">
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <div key={stock.symbol} className="stock-item">
              <StockItemCard
                stock={stock}
                onBuy={onBuy}
                onSell={onSell}
                onFavorite={onFavorite}
              />
              <button onClick={() => handleStockSelect(stock)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <div>No stocks available</div>
        )}
      </div>
    </div>
  )
}

export default Market
