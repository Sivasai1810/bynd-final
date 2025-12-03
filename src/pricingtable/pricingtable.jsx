// import React, { useState } from 'react';
// import './pricingtable.css';
// import { Check, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import TrialConfirmModal from '../Trailforms/TrailConfirmModal.jsx';
// import TrialSuccessModal from '../Trailforms/TrailSuccessModal.jsx';
// import useUserPlan from '../hooks/useUserPlan';

// export default function PricingPlan() {
//   const navigate = useNavigate();
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showToast, setShowToast] = useState(null);
  
//   // Get user plan data
//   const { plan, loading, isFree, isPro, isTrial } = useUserPlan();
  
//   // Calculate days remaining
//   const daysRemaining = plan?.days_remaining || 0;

//   const handleClose = () => {
//     navigate('/dashboard');
//   };

//   const handleTryProClick = () => {
//     setShowConfirmModal(true);
//   };

//   const handleGoToDashboard = () => {
//     setShowSuccessModal(false);
//     navigate('/dashboard');
//   };

//   const showNotification = (message) => {
//     setShowToast(message);
//   };

//   return (
//     <>
//       <div className="pricing-wrapper">
//         <button className="closes-buttons" onClick={handleClose} aria-label="Close">
//           <X size={34} />
//         </button>
        
//         <h1 className="pricing-title">
//           Choose the plan that's right for you
//         </h1>
        
//         <div className="pricing-cards-container">
//           {/* Free Tier */}
//           <div className="plan-card">
//             <div className="plan-card-top">
//               <h2 className="plan-name">Free Tier</h2>
//               <div className="plan-price-row">
//                 <span className="plan-price">$0</span>
//                 <span className="plan-price-period">per month</span>
//               </div>
//             </div>

//             <div className="plan-features">
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">3 Assignment Submissions</span>
//               </div>
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">View Status (Viewed / Not Viewed)</span>
//               </div>
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">Secure Link Sharing</span>
//               </div>
//             </div>

//             {/* Show for Free users */}
//             {isFree && (
//               <div className="plan-current-badge">
//                 <Check className="plan-current-icon" />
//                 <span className="plan-current-label">You're on this plan</span>
//               </div>
//             )}

//             {/* Show for Trial users */}
//             {isTrial && (
//               <div className="plan-trial-info">
//                 <p className="plan-trial-return">You'll return to Free tier after the Pro trial ends</p>
//                 <p className="plan-trial-lose-access">You'll lose access to Pro features</p>
//               </div>
//             )}
//           </div>

//           {/* Pro Tier */}
//           <div className="plan-card">
//             <div className="badge-best-value">
//               Best value
//             </div>

//             <div className="plan-card-top">
//               <h2 className="plan-name">Pro Tier</h2>
//               <div className="plan-price-row">
//                 <span className="plan-price">$12</span>
//                 <span className="plan-price-period">per month</span>
//               </div>
//             </div>

//             <p className="plan-features-header">Everything in Free, Plus</p>

//             <div className="plan-features">
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">Unlimited submissions</span>
//               </div>
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">Instant notifications when design is viewed</span>
//               </div>
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">First & last viewed timestamps</span>
//               </div>
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">Assignment metrics dashboard</span>
//               </div>
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">Engagement score</span>
//               </div>
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">Views over time (Graph)</span>
//               </div>
//               <div className="feature-row">
//                 <Check className="feature-check-icon" />
//                 <span className="feature-label">Smart tracking links</span>
//               </div>
//             </div>

//             {/* Show for Free users */}
//             {isFree && (
//               <>
//                 <button className="plan-cta-btn" onClick={handleTryProClick}>
//                   Try Pro free for 14 days
//                 </button>
//                 <p className="plan-cta-note">
//                   No credit card required
//                 </p>
//               </>
//             )}

//             {/* Show for Trial users */}
//            {isTrial && (
//   <div className="plan-trial-badge">
//     <span className="plan-current-label">
//       <Check className="plan-current-icon" />
//       You're on this plan
//     </span>
//     <p className="plan-trial-ends">Trial ends in {daysRemaining} days</p>
//   </div>
// )}

//             {/* Show for Pro users */}
//             {isPro && (
//               <div className="plan-current-badge">
//                 <Check className="plan-current-icon" />
//                 <span className="plan-current-label">You're on this plan</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer text - Dynamic based on plan */}
//         <p className="pricing-footer-text">
//           {isTrial 
//             ? "You'll automatically return to the Free plan after your trial — no action needed"
//             : "Billed monthly. Cancel anytime."
//           }
//         </p>
//       </div>

//       {/* Modals */}
//       <TrialConfirmModal 
//         isOpen={showConfirmModal}
//         onClose={() => setShowConfirmModal(false)}
//         onShowToast={showNotification}
//       />

//       <TrialSuccessModal 
//         isOpen={showSuccessModal}
//         onGoToDashboard={handleGoToDashboard}
//       />
//     </>
//   );
// }
import React, { useState } from "react";
import "./pricingtable.css";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useUserPlan from "../hooks/useUserPlan";
import { useAuth } from "../hooks/useAuth";

import TrialConfirmModal from "../Trailforms/TrailConfirmModal.jsx";
import TrialSuccessModal from "../Trailforms/TrailSuccessModal.jsx";

export default function PricingPlan() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  // plan state from hook
  const { plan, loading, isFree, isTrial, isPro, refetch } = useUserPlan();

  // UI state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [startingTrial, setStartingTrial] = useState(false);
  const [error, setError] = useState(null);

  const daysRemaining = plan?.days_remaining || 0;

  const handleClose = () => {
    navigate("/dashboard");
  };

  const handleTryProClick = () => {
    setError(null);
    setShowConfirmModal(true);
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    navigate("/dashboard");
  };

  const showNotification = (message) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleConfirmTrial = async () => {
    if (!userId) {
      showNotification("Please log in to start trial.");
      return;
    }

    try {
      setStartingTrial(true);
      setError(null);

      const res = await axios.post(
        "https://bynd-backend.onrender.com/userplan/start-trial",
        { user_id: userId },
        { withCredentials: true }
      );

      showNotification("Your 14-day Pro trial has started!");

      await refetch?.();

      
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error starting trial:", err);
      const msg =
        err?.response?.data?.error || "Failed to start trial. Please try again.";
      setError(msg);
      showNotification(msg);
    } finally {
      setStartingTrial(false);
    }
  };

  if (loading) {
    return <div className="pricing-loading">Loading plans...</div>;
  }

  return (
    <>
      <div className="pricing-wrapper">
  
        <button className="closes-buttons" onClick={handleClose} aria-label="Close">
          <X size={34} />
        </button>

        <h1 className="pricing-title">Choose the plan that's right for you</h1>

        <div className="pricing-cards-container">
          
          <div className="plan-card">
            <div className="plan-card-top">
              <h2 className="plan-name">Free Tier</h2>
              <div className="plan-price-row">
                <span className="plan-price">$0</span>
                <span className="plan-price-period">per month</span>
              </div>
            </div>

            <div className="plan-features">
              <Feature text="3 assignment submissions" />
              <Feature text="View status (Viewed / Not viewed)" />
              <Feature text="Secure link sharing" />
            </div>

            {/* Current free plan badge */}
            {isFree && <CurrentPlanBadge />}

            {/* Info when on trial */}
            {isTrial && (
              <div className="plan-trial-info">
                <p className="plan-trial-return">
                  You'll return to Free tier after the Pro trial ends
                </p>
                <p className="plan-trial-lose-access">
                  You'll lose access to Pro features
                </p>
              </div>
            )}
          </div>
          <div className="plan-card">
            <div className="badge-best-value">Best value</div>

            <div className="plan-card-top">
              <h2 className="plan-name">Pro Tier</h2>
              <div className="plan-price-row">
                <span className="plan-price">$12</span>
                <span className="plan-price-period">per month</span>
              </div>
            </div>

            <p className="plan-features-header">Everything in Free, plus</p>

            <div className="plan-features">
              <Feature text="Unlimited submissions" />
              <Feature text="Instant notifications when design is viewed" />
              <Feature text="First & last viewed timestamps" />
              <Feature text="Assignment metrics dashboard" />
              <Feature text="Engagement score" />
              <Feature text="Views over time (Graph)" />
              <Feature text="Smart tracking links" />
            </div>

            {/* Free user → show Try Pro button (opens confirm modal) */}
            {isFree && (
              <>
                <button
                  className="plan-cta-btn"
                  onClick={handleTryProClick}
                  disabled={startingTrial}
                >
                  {startingTrial ? "Starting trial..." : "Try Pro free for 14 days"}
                </button>
                <p className="plan-cta-note">No credit card required</p>
              </>
            )}

            {/* Trial user → show trial badge + remaining days */}
            {isTrial && (
              <div className="plan-trial-badge">
                <span className="plan-current-label">
                  <Check className="plan-current-icon" />
                  You're on Pro trial
                </span>
                <p className="plan-trial-ends">
                  Trial ends in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
                </p>
              </div>
            )}

            {/* Pro user → show current badge */}
            {isPro && <CurrentPlanBadge label="You're on Pro plan" />}
          </div>
        </div>

        {/* Footer text */}
        <p className="pricing-footer-text">
          {isTrial
            ? "You'll automatically return to the Free plan after your trial — no action needed."
            : "Billed monthly. Cancel anytime."}
        </p>

        {/* Error text */}
        {error && <div className="pricing-error">{error}</div>}

        {/* Toast / small notification */}
        {showToast && <div className="pricing-toast">{showToast}</div>}
      </div>

      <TrialConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onShowToast={showNotification}
        onConfirm={handleConfirmTrial}      
        isSubmitting={startingTrial}       
      />

     
      <TrialSuccessModal
        isOpen={showSuccessModal}
        onGoToDashboard={handleGoToDashboard}
      />
    </>
  );
}


function Feature({ text }) {
  return (
    <div className="feature-row">
      <Check className="feature-check-icon" />
      <span className="feature-label">{text}</span>
    </div>
  );
}

function CurrentPlanBadge({ label = "You're on this plan" }) {
  return (
    <div className="plan-current-badge">
      <Check className="plan-current-icon" />
      <span className="plan-current-label">{label}</span>
    </div>
  );
}
