import React from 'react';
import Upgradetopro from "../../assets/upgradetopro.svg";
import Prorocket from "../../assets/prorocket.svg";
import './ProBanner.css';

export default function ProBanner() {
  return (
    <div className="pro-banner">
      <div className="pro-banner-content">
        <div className="pro-banner-text">
          <p className="pro-banner-title">
            Unlock powerful insights and notifications to stand out — upgrade to Pro and enjoy a 14-day <strong>free</strong> trial today.
          </p>
          <button className="upgrade-pro-btn">
            <img className='prorocket' src={Prorocket} alt="Upgrade" />
            <span> Upgrade to Pro</span>
          </button>
          <span className="no-credit-card">No credit card required</span>
        </div>
      </div>
      <img src={Upgradetopro} alt="Pro illustration" className="pro-illustration" />
    </div>
  );
}