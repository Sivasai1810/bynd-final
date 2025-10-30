import React from 'react';
import Submittedsuccessfully from '../../assets/submittedsuccessfully.svg'
import './SuccessModal.css';

export default function SuccessModal({ show, onClose, shareableLink, onCopyLink }) {
  if (!show) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="success-modal-close" onClick={onClose}>×</button>
        
        <div className="success-modal-content">
          <div className="success-icon-container">
            <img 
              src={Submittedsuccessfully} 
              alt="Success" 
              className="success-icon"
            />
          </div>
          
          <h2 className="success-title">Design submitted successfully!</h2>
          
          <p className="success-description">
            Click 'Copy BYND Link' and share only this link to know if your assignment is viewed, track engagement, and get insights.
          </p>
          
          <button 
            className="success-copy-btn"
            onClick={() => {
              onCopyLink(shareableLink);
              onClose();
            }}
          >
             Copy BYND Link
          </button>
          
          <button 
            className="success-dashboard-btn"
            onClick={onClose}
          >
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}