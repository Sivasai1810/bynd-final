import React from 'react';
import { useNavigate } from "react-router-dom";   
import Probannerlock from "../../assets/probannerlock.svg";
import './14daysbanner.css';

export default function UpgradeProModal({ onClose }) {

  const navigate = useNavigate();   

  const features = [
    'Real-time assignment analytics',
    'First & last viewed timestamps',
    'Views over time (Graph)',
    'Engagement score',
    'Per-assignment view history'
  ];

  const goToPricing = () => {
    onClose?.();                      // Close modal
    navigate("/pricingtable");        
  };

  return (
    <div className="modals-overlays">
      <div className="upgrades-modals">
        
        {/* Close Button */}
        <button 
          className="close-btns"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Lock Icon */}
        <div className="lock-icon-wrapper">
          <img className="lock-icon" src={Probannerlock} alt="lock" />
        </div>

        {/* Title */}
        <h2 className="modal-title">
          See what recruiters won't say — <br />
          Unlock Pro Insights
        </h2>

        {/* Subtitle */}
        <p className="modal-subtitle">
          Know who's engaging. Track every click, view, and moment — and stay ahead.
        </p>

        {/* Features List */}
        <div className="features-container">
          <p className="features-header">Upgrade to Pro tier and get</p>
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <svg 
                  className="check-icon" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button 
          className="try-pro-btn"
          onClick={goToPricing}          
        >
          Try Pro free for 14 days
        </button>

        {/* Footer Text */}
        <p className="footer-text">
          Upgrade to PRO for unlimited slots. No credit card required
        </p>

      </div>
    </div>
  );
}
