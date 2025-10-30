import React from 'react';
import './DiscardModal.css';

export default function DiscardModal({ isOpen, onStay, onDiscard }) {
  if (!isOpen) return null;

  return (
    <div className="discard-modal-overlay">
      <div className="discard-modal">
        <div className="discard-modal-header">
          <button className="discard-close-btn" onClick={onStay}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="discard-modal-body">
          <h3>Discard your submission?</h3>
          <p>You've started filling this out. Leaving now will erase everything.</p>
        </div>

        <div className="discard-modal-actions">
          <button className="discard-btn-stay" onClick={onStay}>
            Stay here
          </button>
          <button className="discard-btn-exit" onClick={onDiscard}>
            Discard & Exit
          </button>
        </div>
      </div>
    </div>
  );
}