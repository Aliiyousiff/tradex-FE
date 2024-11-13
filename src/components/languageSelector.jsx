import React from "react";
import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  return (
    <div className="language-selector">
      <FaLanguage className="language-icon" />
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="language-dropdown"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
