// src/pages/AboutUsPage.jsx

import React from "react"
import { FaLocationArrow, FaFax, FaEnvelope, FaPhone } from "react-icons/fa6"

const AboutUsPage = () => {
  return (
    <div className="aboutus-container">
      <h1>About TradeX</h1>
      <div className="aboutus-sections">
        <div className="card">
          <h2>About Us</h2>
          <p>
            At TradeX, we believe that trading should be accessible, intuitive, and powerful. Our platform is designed to help you trade smarter and invest better.
          </p>
        </div>
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to democratize trading by providing a user-friendly platform that gives everyone, regardless of experience, the opportunity to trade with ease.
          </p>
        </div>
        <div className="card">
          <h2>Contact Us</h2>
          <p>
            <FaLocationArrow /> Location:
            <br />
            Building 1306, Road 4625, Manama Sea Front, 346 Kingdom of Bahrain P.O. Box 20525
          </p>
          <p>
            <FaPhone /> Call: +973 1781 5555
          </p>
          <p>
            <FaEnvelope /> Email: info@TradeX.com
          </p>
          <p>
            <FaFax /> Fax: +973 1772 9928
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
