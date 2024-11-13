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

  // Updated fetchUserSession function
  const fetchUserSession = () => {
    const token = localStorage.getItem("token");
    console.log("Fetching user session, token:", token);

    if (token) {
      axios
        .get("http://localhost:4000/api/profile/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User session response:", response.data);
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            console.error("Profile route not found:", error.response.data);
            alert("Profile route not found. Please check your backend route.");
          } else {
            console.error("Error fetching user session:", error);
          }
          setIsAuthenticated(false);
          setUser(null);
        });
    } else {
      console.log("No token found, setting user as logged out.");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Updated handleLogout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are already logged out.");
        return;
      }

      console.log("Logout button clicked, token:", token);

      // Call the backend logout endpoint
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

        // Clear local storage explicitly
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Reset state
        setUser(null);
        setIsAuthenticated(false);

        // Ensure the user session is reset
        fetchUserSession();

        // Redirect to the login page
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.data.message);
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
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
              element={
                <LoginPage
                  setUser={setUser}
                  fetchUserSession={fetchUserSession}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/market"
              element={
                isAuthenticated ? <Market /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/cryptomarket"
              element={
                isAuthenticated ? <CryptoMarket /> : <Navigate to="/login" />
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
              element={
                isAuthenticated ? (
                  <Profile user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route
              path="/currency-converter"
              element={<CurrencyConverterPage />}
            />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
