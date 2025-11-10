import React from 'react';
import './pricingtable.css';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PricingPlan() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <div className="pricing-wrapper">
      <button className="closes-buttons" onClick={handleClose} aria-label="Close">
        <X size={34} />
      </button>
      
      <h1 className="pricing-title">
        Choose the plan that's right for you
      </h1>
      
      <div className="pricing-cards-container">
        {/* Free Tier */}
        <div className="plan-card">
          <div className="plan-card-top">
            <h2 className="plan-name">Free Tier</h2>
            <div className="plan-price-row">
              <span className="plan-price">$0</span>
              <span className="plan-price-period">per month</span>
            </div>
          </div>

          <div className="plan-features">
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">3 Assignment Submissions</span>
            </div>
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">View Status (Viewed / Not Viewed)</span>
            </div>
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">Secure Link Sharing</span>
            </div>
          </div>

          <div className="plan-current-badge">
            <Check className="plan-current-icon" />
            <span className="plan-current-label">You're on this plan</span>
          </div>
        </div>

      
        <div className="plan-card">
          
          <div className="badge-best-value">
            Best value
          </div>

          <div className="plan-card-top">
            <h2 className="plan-name">Pro Tier</h2>
            <div className="plan-price-row">
              <span className="plan-price">$12</span>
              <span className="plan-price-period">per month</span>
            </div>
          </div>

          <p className="plan-features-header">Everything in Free, Plus</p>

          <div className="plan-features">
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">Unlimited submissions</span>
            </div>
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">Instant notifications when design is viewed</span>
            </div>
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">First & last viewed timestamps</span>
            </div>
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">Assignment metrics dashboard</span>
            </div>
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">Engagement score</span>
            </div>
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">Views over time (Graph)</span>
            </div>
            <div className="feature-row">
              <Check className="feature-check-icon" />
              <span className="feature-label">Smart tracking links</span>
            </div>
          </div>

          <button className="plan-cta-btn">
            Try Pro free for 14 days
          </button>
          <p className="plan-cta-note">
            No credit card required
          </p>
        </div>
      </div>

      {/* Footer text */}
      <p className="pricing-footer-text">
        Billed monthly. Cancel anytime.
      </p>
    </div>
  );
}