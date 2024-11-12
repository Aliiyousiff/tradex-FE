import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom' // Removed BrowserRouter from here
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Market from './pages/Market'
import Profile from './pages/Profile'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import axios from 'axios'
import './App.css';

const App = () => {
  // State to manage user authentication
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Fetch user data from the API if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      axios
        .get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setUser(response.data)
          setIsAuthenticated(true)
        })
        .catch((error) => {
          console.error('Authentication error:', error)
          setIsAuthenticated(false)
        })
    }
  }, [])

  // Handle logout by clearing the auth token
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
    setIsAuthenticated(false)
  }

  // Handle buy, sell, and favorite stock actions
  const handleBuyStock = (stock) => {
    if (!isAuthenticated) return alert('Please login to buy stocks.')
    axios
      .post('/api/user/buy', { stockSymbol: stock.symbol })
      .then(() => alert('Stock bought successfully!'))
      .catch((error) => console.error('Error buying stock:', error))
  }

  const handleSellStock = (stock) => {
    if (!isAuthenticated) return alert('Please login to sell stocks.')
    axios
      .post('/api/user/sell', { stockSymbol: stock.symbol })
      .then(() => alert('Stock sold successfully!'))
      .catch((error) => console.error('Error selling stock:', error))
  }

  const handleAddToFavorites = (stock) => {
    if (!isAuthenticated) return alert('Please login to add to favorites.')
    axios
      .post('/api/user/favorites', { stockSymbol: stock.symbol })
      .then(() => alert('Stock added to favorites!'))
      .catch((error) => console.error('Error adding to favorites:', error))
  }

  return (
    <div className="App">
      {/* Navbar with dynamic links */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
          }
        />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/market"
          element={
            <Market
              onBuy={handleBuyStock}
              onSell={handleSellStock}
              onFavorite={handleAddToFavorites}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard user={user} />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            )
          }
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            <Market
              onBuy={handleBuyStock}
              onSell={handleSellStock}
              onFavorite={handleAddToFavorites}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
