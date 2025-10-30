// import React from 'react';
// import './ProfileDropdown.css';

// export default function ProfileDropdown({ profile, onLogout }) {
//   return (
//     <div className="profile-dropdown">
//       {/* Header with Plan */}
//       <div className="profile-dropdown-plan-header">
//         <span className="plan-label">Free Plan</span>
//         <button className="close-button" aria-label="Close">×</button>
//       </div>

//       {/* Profile Section */}
//       <div className="profile-dropdown-info">
//         <div className="profile-avatar-section">
//           {profile?.avatar_url && (
//             <img 
//               src={profile.avatar_url} 
//               alt="Avatar" 
//               className="profile-dropdown-avatar"
//             />
//           )}
//         </div>
//         <div className="profile-details">
//           <p className="profile-dropdown-name">
//             {profile?.user_name || 'Mohammed Ayaan'}
//           </p>
//           <div className="profile-email-row">
//             <p className="profile-dropdown-email">
//               {profile?.user_email || 'mohdayaan@gmail.com'}
//             </p>
//             <button className="change-link">change</button>
//           </div>
//         </div>
//       </div>

//       {/* Current Plan Section */}
//       <div className="profile-plan-section">
//         <div className="plan-info">
//           <svg className="plan-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <rect x="2" y="5" width="20" height="14" rx="2"/>
//             <line x1="2" y1="10" x2="22" y2="10"/>
//           </svg>
//           <span className="plan-text">Current plan: <strong>Free</strong></span>
//           <a href="#upgrade" className="upgrade-link">Upgrade to Pro</a>
//         </div>
//       </div>

//       {/* Logout Section */}
//       <div className="profile-logout-section">
//         <button onClick={onLogout} className="logout-button">
//           <svg className="logout-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//             <polyline points="16 17 21 12 16 7"/>
//             <line x1="21" y1="12" x2="9" y2="12"/>
//           </svg>
//           <span>Log out</span>
//         </button>
//       </div>

//       {/* Help Section */}
//       <div className="profile-help-section">
//         <svg className="help-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <circle cx="12" cy="12" r="10"/>
//           <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
//           <line x1="12" y1="17" x2="12.01" y2="17"/>
//         </svg>
//         <span className="help-text">Need help?</span>
//         <a href="mailto:support@example.com" className="email-link">Email us</a>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import ChangeEmailModal from '../../component/changepassword/changemail.jsx';
import Creditcard from "../../assets/creditcard.svg"
import './ProfileDropdown.css';

export default function ProfileDropdown({ profile, onClose, onLogout }) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(profile?.user_email || 'mohdayaan@gmail.com');

  const handleChangeEmail = (e) => {
    // Stop propagation to prevent dropdown from closing prematurely
    e.stopPropagation();
    
    // Close the dropdown first
    if (onClose) {
      onClose();
    }
    
    // Then open the email modal
    setShowEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
  };

  const handleEmailChanged = (newEmail) => {
    // Update the email after successful change
    setCurrentEmail(newEmail);
    console.log('Email successfully changed to:', newEmail);
  };

  const handleLogoutClick = (e) => {
    e.stopPropagation();
    if (onLogout) {
      onLogout();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Email Modal - Rendered at root level with higher z-index */}
      {showEmailModal && (
        <ChangeEmailModal
          currentEmail={currentEmail}
          onClose={handleCloseEmailModal}
          onEmailChanged={handleEmailChanged}
        />
      )}

      {/* Profile Dropdown */}
      <div className="profile-dropdown">
        {/* Header with Plan */}
        <div className="profile-dropdown-plan-header">
          <span className="plan-label">Free Plan</span>
          <button 
            className="close-button" 
            onClick={handleCloseClick}
            aria-label="Close dropdown"
          >
            ×
          </button>
        </div>

        {/* Profile Section */}
        <div className="profile-dropdown-info">
          <div className="profile-avatar-section">
            {profile?.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="Profile"
                className="profile-dropdown-avatar"
              />
            )}
          </div>

          <div className="profile-details">
            <h3 className="profile-dropdown-name">
              {profile?.user_name || 'Mohammed Ayaan'}
            </h3>

            <div className="profile-email-row">
              <p className="profile-dropdown-email">{currentEmail}</p>
              <button
                className="change-link"
                onClick={handleChangeEmail}
              >
                change
              </button>
            </div>
          </div>
        </div>

        {/* Current Plan Section */}
        <div className="profile-plan-section">
          <div className="plan-info">
            {/* <svg
              className="plan-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1L10.472 5.99533L16 6.76393L12 10.6607L12.944 16L8 13.3953L3.056 16L4 10.6607L0 6.76393L5.528 5.99533L8 1Z"
                fill="currentColor"
              />
            </svg> */}
            <img src={Creditcard} alt='card'></img>
            <span className="plan-text">
              Current plan: <strong>Free</strong>
            </span>
            <a href="#" className="upgrade-link">
              Upgrade to Pro
            </a>
          </div>
        </div>

        {/* Logout Section */}
        <div className="profile-logout-section">
          <button className="logout-button" onClick={handleLogoutClick}>
            <svg
              className="logout-icon"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 16H3C2.46957 16 1.96086 15.7893 1.58579 15.4142C1.21071 15.0391 1 14.5304 1 14V4C1 3.46957 1.21071 2.96086 1.58579 2.58579C1.96086 2.21071 2.46957 2 3 2H7M12 13L17 9L12 5M17 9H7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Log out</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="profile-help-section">
          <svg
            className="help-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="M8 12V12.01M8 9C8 8.5 8.5 8 9 7.5C9.5 7 10 6.5 10 5.5C10 4.5 9 4 8 4C7 4 6 4.5 6 5.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="help-text">Need help?</span>
          <a href="mailto:support@example.com" className="email-link">
            Email us
          </a>
        </div>
      </div>
    </>
  );
}