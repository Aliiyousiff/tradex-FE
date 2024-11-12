import React from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaMoneyBillWave, FaLock } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to TradeX</h1>
          <p>Your trusted platform for intelligent trading and smart investments.</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature">
          <FaChartLine size={50} color="#34c759" />
          <h3>Real-Time Market Insights</h3>
          <p>Stay ahead of the market with real-time stock prices, trends, and advanced analytics to make informed decisions.</p>
        </div>
        <div className="feature">
          <FaMoneyBillWave size={50} color="#ff3b30" />
          <h3>Powerful Trading Tools</h3>
          <p>Leverage advanced trading features, including real-time price tracking and intuitive order execution tools.</p>
        </div>
        <div className="feature">
          <FaLock size={50} color="#4a90e2" />
          <h3>Top-Tier Security</h3>
          <p>Your privacy is our priority. Enjoy peace of mind with robust encryption and industry-leading security protocols.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Your Trading Journey Today</h2>
        <p>Join thousands of traders who trust TradeX for seamless, secure, and efficient trading.</p>
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
