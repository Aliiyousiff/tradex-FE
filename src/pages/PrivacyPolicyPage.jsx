import React from "react";
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="privacy-policy-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('privacyPolicyTitle')}</h1>
          <p>{t('privacyPolicyIntro')}</p>
        </div>
      </section>

      {/* Privacy Policy Content Section */}
      <section className="policy-section">
        <div className="policy-container">
          <h2>{t('informationWeCollect')}</h2>
          <p>{t('informationWeCollectContent')}</p>

          <h2>{t('howWeUseYourInformation')}</h2>
          <p>{t('howWeUseYourInformationContent')}</p>

          <h2>{t('dataSecurity')}</h2>
          <p>{t('dataSecurityContent')}</p>

          <h2>{t('sharingYourInformation')}</h2>
          <p>{t('sharingYourInformationContent')}</p>

          <h2>{t('yourRights')}</h2>
          <p>{t('yourRightsContent')}</p>

          <h2>{t('changesToThisPrivacyPolicy')}</h2>
          <p>{t('changesToThisPrivacyPolicyContent')}</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/aboutus">{t('aboutUs')}</a>
          <a href="/contact">{t('contact')}</a>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
