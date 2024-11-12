import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-policy-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Privacy Policy</h1>
          <p>Your privacy is very important to us. Please read our Privacy Policy to learn more about how we protect your data.</p>
        </div>
      </section>

      <section className="policy-section">
        <div className="policy-container">
          <h2>1. Information We Collect</h2>
          <p>We collect personal information such as your name, email address, and financial information when you use our platform. We also collect data related to your usage of our services for improving user experience.</p>

          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to provide you with services, improve our platform, communicate with you about updates, and comply with legal requirements.</p>

          <h2>3. Data Security</h2>
          <p>We use industry-standard encryption and security protocols to protect your data from unauthorized access, alteration, or disclosure.</p>

          <h2>4. Sharing Your Information</h2>
          <p>We do not sell or rent your personal information to third parties. We may share your information with trusted partners only for the purpose of providing our services to you.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time. You may also opt-out of marketing communications by following the instructions provided in those communications.</p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>We reserve the right to update or change this Privacy Policy. Any changes will be posted on this page, and the updated date will be reflected at the bottom of this page.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/aboutus">About Us</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
