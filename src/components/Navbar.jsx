import React from 'react'
import { Link } from 'react-router-dom'
import { FaSignOutAlt, FaUser, FaChartLine, FaStore } from 'react-icons/fa'


const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TradeX
        </Link>
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
      </div>
    </nav>
  )
}

export default Navbar
