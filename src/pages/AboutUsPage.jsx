import React from "react"
import { FaLocationArrow, FaFax, FaEnvelope, FaPhone } from "react-icons/fa6"
import { useTranslation } from "react-i18next"

const AboutUsPage = () => {
  const { t } = useTranslation()

  return (
    <div className="aboutus-container">
      <h1>{t("aboutUs")}</h1> 
      <div className="aboutus-sections">
        <div className="card">
          <h2>{t("aboutUsTitle")}</h2> 
          <p>{t("aboutUsContent")}</p> 
        </div>
        <div className="card">
          <h2>{t("ourMission")}</h2> 
          <p>{t("ourMissionContent")}</p> 
        </div>
        <div className="card">
          <h2>{t("contactUs")}</h2> 
          <p>
            <FaLocationArrow /> {t("location")}:
            <br />
            {t("address")}
          </p>
          <p>
            <FaPhone /> {t("call")}: +973 1781 5555
          </p>
          <p>
            <FaEnvelope /> {t("email")}: info@TradeX.com
          </p>
          <p>
            <FaFax /> {t("fax")}: +973 1772 9928
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
