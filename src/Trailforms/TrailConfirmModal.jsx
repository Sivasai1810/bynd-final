// import React from "react";
// import { X } from "lucide-react";
// import "../Trailforms/TrailConfirmModal.css";

// export default function TrialConfirmModal({ isOpen, onClose, onConfirm }) {
//   if (!isOpen) return null;

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   return (
//     <div className="trial-modal-overlay" onClick={handleOverlayClick}>
//       <div className="trial-modal">
//         <button className="trial-modal-close" onClick={onClose} aria-label="Close modal">
//           <X size={18} />
//         </button>

//         <div className="trial-modal-content">
//           <h2 className="trial-modal-title">Start your 14 days free trial?</h2>
//           <p className="trial-modal-subtitle">
//             You’ll unlock all Pro features instantly.
//           </p>
//           <p className="trial-modal-note">
//             You won’t be charged — your plan will auto-downgrade to Free after 14 days unless you upgrade.
//           </p>

//           <div className="trial-modal-actions">
//             <button className="trial-btn-secondary" onClick={onClose}>
//               Not now
//             </button>
//             <button className="trial-btn-primary" onClick={onConfirm}>
//               Start Trial
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Loader2 } from "lucide-react";
import "../Trailforms/TrailConfirmModal.css";
import TrialSuccessModal from "../Trailforms/TrailSuccessModal";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function TrialConfirmModal({ isOpen, onClose }) {
  const navigate=useNavigate();
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isOpen && !showSuccessModal) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleStartTrial = async () => {
    if (!userId) {
      setError("Please log in to start trial");
      return;
    }

    console.log("Starting trial for userId:", userId);

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://bynd-backend.onrender.com/userplan/start-trial",
        { user_id: userId },
        { withCredentials: true }
      );

      console.log("Full response:", response);
      console.log("Response data:", response.data);

      // Check if the request was successful (status 200 and has subscription data)
      if (response.status === 200 && response.data.subscription) {
        console.log("Trial started successfully!");
        
        // Close confirm modal first
        onClose();
        
        // Small delay to ensure smooth transition between modals
        setTimeout(() => {
          setShowSuccessModal(true);
          console.log("Success modal opened");
        }, 150);
      } else {
        setError("Unexpected response from server");
      }
      
    } catch (err) {
      console.error("Error starting trial:", err);
      
      if (err.response) {
        console.error("Error response:", err.response.data);
        setError(err.response.data.error || "Failed to start trial. Please try again.");
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError(err.message || "Failed to start trial. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    navigate('/dashboard')
    window.location.reload();


  };

  return (
    <>
      {/* Confirm Modal */}
      {isOpen && (
        <div className="trial-modal-overlay" onClick={handleOverlayClick}>
          <div className="trial-modal">
            <button 
              className="trial-modal-close" 
              onClick={onClose} 
              aria-label="Close modal"
              disabled={isLoading}
            >
              <X size={18} />
            </button>

            <div className="trial-modal-content">
              <h2 className="trial-modal-title">Start your 14 days free trial?</h2>
              <p className="trial-modal-subtitle">
                You'll unlock all Pro features instantly.
              </p>
              <p className="trial-modal-note">
                You won't be charged — your plan will auto-downgrade to Free after 14 days unless you upgrade.
              </p>

              {error && (
                <div style={{
                  padding: '0.75rem',
                  marginTop: '1rem',
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: '0.375rem',
                  color: '#c00',
                  fontSize: '0.875rem'
                }}>
                  {error}
                </div>
              )}

              <div className="trial-modal-actions">
                <button 
                  className="trial-btn-secondary" 
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Not now
                </button>
                <button 
                  className="trial-btn-primary" 
                  onClick={handleStartTrial}
                  disabled={isLoading || !userId}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Starting...
                    </>
                  ) : (
                    "Start Trial"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <TrialSuccessModal 
        isOpen={showSuccessModal} 
        onGoToDashboard={handleGoToDashboard}
      />
    </>
  );
}