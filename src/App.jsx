import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market'; // Stock market
import CryptoMarket from './pages/CryptoMarket'; // Cryptocurrency market
import Profile from './pages/Profile';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import StockDetail from './pages/StockDetail';
import CryptoDetail from './pages/CryptoDetail'; // Cryptocurrency detail
import AboutUsPage from './pages/AboutUsPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

import axios from 'axios';
import './App.css';
import CurrencyConverterPage from './pages/CurrencyConverterPage';


import { useTranslation } from 'react-i18next'; // Import useTranslation hook

// i18next configuration (imported from an external file, here it's embedded for simplicity)
import i18n from './i18n'; // Import your i18next configuration

const App = () => {
  const { t, i18n } = useTranslation(); // Initialize i18n for translations
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios
        .get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Stock handling
  const handleBuyStock = (stock) => {
    if (!isAuthenticated) return alert(t('pleaseLoginToBuyStocks'));
    axios
      .post('/api/user/buy', { stockSymbol: stock.symbol })
      .then(() => {
        alert(t('stockBoughtSuccessfully'));
      })
      .catch((error) => {
        console.error('Error buying stock:', error);
      });
  };

  const handleSellStock = (stock) => {
    if (!isAuthenticated) return alert(t('pleaseLoginToSellStocks'));
    axios
      .post('/api/user/sell', { stockSymbol: stock.symbol })
      .then(() => {
        alert(t('stockSoldSuccessfully'));
      })
      .catch((error) => {
        console.error('Error selling stock:', error);
      });
  };

  const handleAddToFavorites = (stock) => {
    if (!isAuthenticated) return alert(t('pleaseLoginToAddToFavorites'));
    axios
      .post('/api/user/favorites', { stockSymbol: stock.symbol })
      .then(() => {
        alert(t('stockAddedToFavorites'));
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);
      });
  };

  // Cryptocurrency handling
  const handleBuyCrypto = (crypto) => {
    if (!isAuthenticated) return alert(t('pleaseLoginToBuyCrypto'));
    axios
      .post('/api/user/buy-crypto', { cryptoSymbol: crypto.symbol })
      .then(() => {
        alert(t('cryptoBoughtSuccessfully'));
      })
      .catch((error) => {
        console.error('Error buying cryptocurrency:', error);
      });
  };

  const handleSellCrypto = (crypto) => {
    if (!isAuthenticated) return alert(t('pleaseLoginToSellCrypto'));
    axios
      .post('/api/user/sell-crypto', { cryptoSymbol: crypto.symbol })
      .then(() => {
        alert(t('cryptoSoldSuccessfully'));
      })
      .catch((error) => {
        console.error('Error selling cryptocurrency:', error);
      });
  };

  const handleAddToFavoritesCrypto = (crypto) => {
    if (!isAuthenticated) return alert(t('pleaseLoginToAddToFavoritesCrypto'));
    axios
      .post('/api/user/favorites-crypto', { cryptoSymbol: crypto.symbol })
      .then(() => {
        alert(t('cryptoAddedToFavorites'));
      })
      .catch((error) => {
        console.error('Error adding to favorites cryptocurrency:', error);
      });
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/market"
          element={
            isAuthenticated ? (
              <Market
                onBuy={handleBuyStock}
                onSell={handleSellStock}
                onFavorite={handleAddToFavorites}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cryptomarket"
          element={
            isAuthenticated ? (
              <CryptoMarket
                onBuy={handleBuyCrypto}
                onSell={handleSellCrypto}
                onFavorite={handleAddToFavoritesCrypto}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/stockdetail" element={<StockDetail />} />
        <Route path="/cryptodetail" element={<CryptoDetail />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/currency-converter" element={<CurrencyConverterPage />} />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;