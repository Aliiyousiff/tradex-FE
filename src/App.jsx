import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import CryptoMarket from "./pages/CryptoMarket";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StockDetail from "./pages/StockDetail";
import CryptoDetail from "./pages/CryptoDetail";
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import i18n from "./i18n";
import axios from "axios";
import "./App.css";
import CurrencyConverterPage from "./pages/CurrencyConverterPage";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchUserSession();
  }, []);

  // Fetch the current user session
  const fetchUserSession = async () => {
    const token = localStorage.getItem("token");
    console.log("Fetching user session, token:", token);

    if (!token) {
      console.log("No token found, user is not authenticated.");
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const response = await axios.get("http://localhost:4000/api/profile/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User session response:", response.data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user session:", error.response?.data || error.message);

      // Check for specific errors and provide user-friendly messages
      if (error.response && error.response.status === 400) {
        alert("Session expired. Please log in again.");
      } else if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please log in.");
      } else if (error.response && error.response.status >= 500) {
        alert("Internal server error. Please check your backend.");
      }

      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are already logged out.");
        return;
      }

      console.log("Logout initiated, token:", token);

      const response = await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Logout successful");

        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);

        window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.data.message);
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error.response?.data || error.message);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Nav
          user={user}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginPage setUser={setUser} fetchUserSession={fetchUserSession} setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/market" element={isAuthenticated ? <Market /> : <Navigate to="/login" replace />} />
            <Route path="/cryptomarket" element={isAuthenticated ? <CryptoMarket /> : <Navigate to="/login" replace />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/login" replace />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/currency-converter" element={<CurrencyConverterPage />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
