import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUser,
  FaStore,
  FaSun,
  FaMoon,
  FaInfoCircle,
  FaBitcoin,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./languageSelector";

const Navbar = ({ isAuthenticated, onLogout, user }) => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("light-mode", !newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src="/images/logo.png"
            alt="TradeX Logo"
            className="navbar-logo-img"
          />
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/market" className="navbar-link">
              <FaStore /> {t("market")}
            </Link>
          </li>
          <li>
            <Link to="/cryptomarket" className="navbar-link">
              <FaBitcoin /> {t("cryptoMarket")}
            </Link>
          </li>
          <li>
            <Link to="/currency-converter" className="navbar-link">
              <FaBitcoin /> {t("currencyConverter")}
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="navbar-link">
              <FaInfoCircle /> {t("aboutUs")}
            </Link>
          </li>

          {isAuthenticated && user ? (
            <>
              <li>
                <Link to="/profile" className="navbar-link">
                  <FaUser /> {t("profile")} ({user.username})
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    console.log("Logout button clicked");
                    onLogout();
                  }}
                  className="logout-button"
                >
                  <FaSignOutAlt /> {t("logout")}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  {t("login")}
                </Link>
              </li>
              <li>
                <Link to="/register" className="navbar-link">
                  {t("register")}
                </Link>
              </li>
            </>
          )}
        </ul>

        <LanguageSelector />
        <button onClick={toggleDarkMode} className="toggle-button">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
