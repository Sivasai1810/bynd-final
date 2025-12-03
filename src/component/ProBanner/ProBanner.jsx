import Upgradetopro from "../../assets/upgradetopro.svg";
import Prorocket from "../../assets/prorocket.svg";
import "./ProBanner.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const PromoBanner = () => {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate("/Pricingtable"); 
  };
  return (
    <div className="promo-banner">
      <div className="promo-content">

        {/* LEFT — TEXT */}
        <div className="promo-text">
          <h2 className="promo-heading">
            Unlock powerful insights and notifications to stand out — upgrade to Pro
            and enjoy a 14-day <span className="free-text">free</span> trial today.
          </h2>

            <div className="promo-actions">
            <button className="upgrade-btn" onClick={handleUpgradeClick}>
              <img src={Prorocket} alt="" className="rocket-icon" />
              Upgrade to Pro
            </button>

            <p className="no-credit-text">No credit card required</p>
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="promo-image">
          <img src={Upgradetopro} alt="Pro features" />
        </div>

      </div>
    </div>
  );
};

export default PromoBanner;
