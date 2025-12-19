import React, { useState, useEffect } from 'react';
import Partypopup from "../assets/party-pop-up.svg"
import "./TrailSuccessModal.css";

const TrialSuccessModal = ({ isOpen, onGoToDashboard }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const pieces = [];
    const colors = ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6'];
    
    for (let i = 0; i < 30; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setConfetti(pieces);
  }, [isOpen]);

  const features = [
    "Real-time news alerts",
    "Assignment metrics dashboard",
    "First & last viewed timestamps",
    "Limitless submissions",
    "Engagement score",
    "Unlimited links (Graph)",
    "Smart tracking links"
  ];

  if (!isOpen) return null;

  return (
    <div className="trial-success-modal-overlay">
      <div className="trial-success-modal-container">
    <div className="trial-success-modal-party-popup">
          <img src={Partypopup} alt="Party celebration" />
        </div>
        <div className="trial-success-modal-confetti">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="trial-success-confetti-piece"
              style={{
                left: `${piece.left}%`,
                backgroundColor: piece.color,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`
              }}
            />
          ))}
        </div>

        {/* Modal Content */}
        <div className="trial-success-modal-content">
          <h2 className="trial-success-modal-title">You're on the Pro trial!</h2>
          <p className="trial-success-modal-subtitle">
            Enjoy full access to insights,alerts, and unlimited submissions — free for 14 days.
          </p>

          {/* Features Section */}
          <div className="trial-success-modal-info-section">
            <h3 className="trial-success-modal-info-title">What you get</h3>
            <div className="trial-success-modal-features-list">
              {features.map((feature, index) => (
                <div key={index} className="trial-success-modal-feature-item">
                  <svg 
                    className="trial-success-modal-check-icon" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button 
            className="trial-success-modal-cta-btn"
            onClick={onGoToDashboard}
          >
            Go to dashboard
          </button>
          <p className="trial-success-modal-trial-info">
            Trial ends in 14 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrialSuccessModal;
