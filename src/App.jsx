import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Profile from "./pages/Profile";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import StockDetail from "./pages/StockDetail";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage"; // Add the home page
import axios from "axios";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Checking authentication status...");
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User authenticated:", response.data);
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleBuyStock = (stock) => {
    if (!isAuthenticated) return alert("Please login to buy stocks.");
    axios
      .post("/api/user/buy", { stockSymbol: stock.symbol })
      .then(() => {
        alert("Stock bought successfully!");
      })
      .catch((error) => {
        console.error("Error buying stock:", error);
      });
  };

  const handleSellStock = (stock) => {
    if (!isAuthenticated) return alert("Please login to sell stocks.");
    axios
      .post("/api/user/sell", { stockSymbol: stock.symbol })
      .then(() => {
        alert("Stock sold successfully!");
      })
      .catch((error) => {
        console.error("Error selling stock:", error);
      });
  };

  const handleAddToFavorites = (stock) => {
    if (!isAuthenticated) return alert("Please login to add to favorites.");
    axios
      .post("/api/user/favorites", { stockSymbol: stock.symbol })
      .then(() => {
        alert("Stock added to favorites!");
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
      });
  };

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page route */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
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
            isAuthenticated ? <Dashboard user={user} /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
          }
        />
        <Route path="/stockdetail" element={<StockDetail />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
