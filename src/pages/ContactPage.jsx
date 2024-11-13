import React from "react";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();  // Hook to access translations

  return (
    <div className="contact-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('contactUs')}</h1>  {/* Translated title */}
        </div>
      </section>

      <section className="contact-form-section">
        <div className="form-container">
          <h2>{t('get In Touch')}</h2> {/* Translated section title */}
          <form>
            <label htmlFor="name">{t('Name')}</label>
            <input type="text" id="name" name="name" placeholder={t('your Name')} required />

            <label htmlFor="email">{t('email Address')}</label>
            <input type="email" id="email" name="email" placeholder={t('your Email')} required />

            <label htmlFor="message">{t('message')}</label>
            <textarea id="message" name="message" placeholder={t('your Message')} rows="4" required></textarea>

            <button type="submit">{t('send Message')}</button> {/* Translated button text */}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="/aboutus">{t('aboutUs')}</a>
          <a href="/privacy">{t('privacyPolicy')}</a>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
