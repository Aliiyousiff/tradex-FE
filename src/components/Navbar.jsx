import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaChartLine, FaStore, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/logo.png" alt="TradeX Logo" className="navbar-logo-img" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/market" className="navbar-link">
            <FaStore /> Market
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard" className="navbar-link">
                <FaChartLine /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile" className="navbar-link">
                <FaUser /> Profile
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      <button onClick={toggleDarkMode} className="toggle-button">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
