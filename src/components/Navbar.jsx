import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUser, FaChartLine, FaStore, FaSun, FaMoon, FaInfoCircle, FaBitcoin, FaLanguage } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' || false); 
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en"); 

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("light-mode", !newDarkMode);
    localStorage.setItem("darkMode", newDarkMode); 
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage); 
    i18n.changeLanguage(selectedLanguage); 
  };

  useEffect(() => {
    i18n.changeLanguage(language); 
  }, [language, i18n]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="TradeX Logo" className="navbar-logo-img" />
        </Link>
        <ul className="navbar-links">
          
          {isAuthenticated && (
            <>
              <li>
                <Link to="/market" className="navbar-link">
                  <FaStore /> {t('market')} 
                </Link>
              </li>
              <li>
                <Link to="/cryptomarket" className="navbar-link">
                  <FaBitcoin /> {t('cryptoMarket')} 
                </Link>
              </li>
            </>
          )}
           <li>
            <Link to="/currency-converter" className="navbar-link">
              <FaBitcoin /> {t('currencyConverter')}
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="navbar-link">
              <FaInfoCircle /> {t('aboutUs')} 
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link">
              {t('contact')} 
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="navbar-link">
              {t('privacyPolicy')} 
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="navbar-link">
                  <FaChartLine /> {t('dashboard')} 
                </Link>
              </li>
              <li>
                <Link to="/profile" className="navbar-link">
                  <FaUser /> {t('profile')} 
                </Link>
              </li>
              <li>
                <button onClick={onLogout} className="logout-button">
                  <FaSignOutAlt /> {t('logout')} 
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">{t('login')}</Link>
              </li>
              <li>
                <Link to="/register" className="navbar-link">{t('register')}</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="language-selector">
        <FaLanguage />
        <select value={language} onChange={handleLanguageChange} className="language-dropdown">
          <option value="en">{t('english')}</option>
          <option value="es">{t('spanish')}</option>
          <option value="fr">{t('french')}</option>
          <option value="ar">{t('arabic')}</option> 
        </select>
      </div>

      <button onClick={toggleDarkMode} className="toggle-button">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
