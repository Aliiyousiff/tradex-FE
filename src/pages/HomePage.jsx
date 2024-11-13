import React from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaMoneyBillWave, FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();  // Hook for translations

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('welcomeMessage')}</h1>  {/* Translated welcome message */}
          <p>{t('heroDescription')}</p>  {/* Translated description */}
          <Link to="/register" className="cta-button">{t('getStarted')}</Link> {/* Translated button */}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature">
          <FaChartLine size={50} color="#34c759" />
          <h3>{t('realTimeMarketInsights')}</h3>  {/* Translated feature title */}
          <p>{t('realTimeMarketDescription')}</p> {/* Translated feature description */}
        </div>
        <div className="feature">
          <FaMoneyBillWave size={50} color="#ff3b30" />
          <h3>{t('powerfulTradingTools')}</h3>  {/* Translated feature title */}
          <p>{t('powerfulTradingToolsDescription')}</p> {/* Translated feature description */}
        </div>
        <div className="feature">
          <FaLock size={50} color="#4a90e2" />
          <h3>{t('topTierSecurity')}</h3>  {/* Translated feature title */}
          <p>{t('topTierSecurityDescription')}</p> {/* Translated feature description */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>{t('startYourTradingJourney')}</h2>  {/* Translated CTA header */}
        <p>{t('joinThousandsOfTraders')}</p>  {/* Translated CTA subheader */}
        <Link to="/register" className="cta-button">{t('getStarted')}</Link> {/* Translated button */}
      </section>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/aboutus">{t('aboutUs')}</Link>
          <Link to="/contact">{t('contact')}</Link>
          <Link to="/privacy">{t('privacyPolicy')}</Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
