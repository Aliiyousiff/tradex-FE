import React from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaMoneyBillWave, FaLock } from "react-icons/fa";


const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to TradeX</h1>
          <p>Your gateway to smarter trading and investment</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature">
          <FaChartLine size={50} color="#34c759" />
          <h3>Real-Time Market Data</h3>
          <p>Access up-to-date stock prices, market trends, and analytics at your fingertips.</p>
        </div>
        <div className="feature">
          <FaMoneyBillWave size={50} color="#ff3b30" />
          <h3>Trading Tools</h3>
          <p>Advanced tools for buying and selling stocks, with real-time price tracking.</p>
        </div>
        <div className="feature">
          <FaLock size={50} color="#4a90e2" />
          <h3>Secure Platform</h3>
          <p>Your data and transactions are secure with state-of-the-art encryption and security measures.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to start trading?</h2>
        <p>Sign up today to access exclusive trading tools and resources.</p>
        <Link to="/register" className="cta-button">Join Now</Link>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/aboutus">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
