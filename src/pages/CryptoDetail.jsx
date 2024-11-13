import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const CryptoDetail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [crypto, setCrypto] = useState(null)

  useEffect(() => {
    if (location.state && location.state.crypto) {
      setCrypto(location.state.crypto)
    } else {
      navigate('/cryptomarket')
    }
  }, [location, navigate])

  if (!crypto) {
    return <div>Loading...</div>
  }

  const chartData = {
    labels: crypto.priceHistory.map((entry) => entry.date),
    datasets: [
      {
        label: `${crypto.name} Price History`,
        data: crypto.priceHistory.map((entry) => entry.price),
        fill: false,
        borderColor: '#4a90e2',
        backgroundColor: '#4a90e2',
        pointRadius: 5,
        tension: 0.2
      }
    ]
  }

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="crypto-detail">
      <h1 className="crypto-name">{crypto.name} Details</h1>
      <div className="crypto-info">
        <p>
          <strong>Symbol:</strong> {crypto.symbol}
        </p>
        <p>
          <strong>Price:</strong> ${crypto.price.toFixed(2)}
        </p>
        <p>
          <strong>Market Cap:</strong> $
          {formatNumber(crypto.marketCap.toFixed(0))}
        </p>
        <p>
          <strong>Volume:</strong> {formatNumber(crypto.volume.toFixed(0))}
        </p>
      </div>

      <div className="chart-container">
        <h2>Price History</h2>
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  )
}

export default CryptoDetail
