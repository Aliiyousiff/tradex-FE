import React from "react";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>If you have any questions or need assistance, don't hesitate to reach out to us.</p>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="form-container">
          <h2>Get in Touch</h2>
          <form>
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />

            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />

            <label for="message">Message</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="4" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/aboutus">About Us</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
