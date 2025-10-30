import React from 'react';
import './DeleteConfirmationModal.css';

export default function DeleteConfirmationModal({ show, onClose, onConfirm, submissionData, isDeleting }) {
  if (!show) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <button className="delete-modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="delete-modal-content">
          <h3 className="delete-modal-title">Are you sure?</h3>
          
          <p className="delete-modal-description">
            All data regarding the assignment, analytics and metrics will be lost.
          </p>

          {submissionData && (
            <div className="delete-modal-submission-info">
              <strong>{submissionData.companyName}</strong> - {submissionData.position}
            </div>
          )}

          <div className="delete-modal-actions">
            <button 
              className="delete-modal-btn cancel-btn" 
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button 
              className="delete-modal-btn confirm-btn" 
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Confirm & Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}