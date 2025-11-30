import React, { useState, useEffect, useRef } from 'react';
import ChangeEmailModal from '../../component/changepassword/changemail.jsx';
import Creditcard from "../../assets/creditcard.svg";
import Star from "../../assets/prostart.svg";
import useUserPlan from '../../hooks/useUserPlan';
import './ProfileDropdown.css';

export default function ProfileDropdown({ profile, onClose, onLogout }) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(profile?.user_email || 'mohdayaan@gmail.com');
  const dropdownRef = useRef(null);
  
  // Get user plan using the hook
  const { plan, loading, isFree, isPro, isTrial } = useUserPlan();

  const isProUser = isPro || isTrial;
  const planDisplay = isProUser ? 'Pro' : 'Free';

  console.log('ProfileDropdown - Plan:', plan);
  console.log('ProfileDropdown - isPro:', isPro, 'isTrial:', isTrial, 'isFree:', isFree);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChangeEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClose) onClose(); 
    setTimeout(() => setShowEmailModal(true), 200); 
  };

  const handleCloseEmailModal = () => setShowEmailModal(false);

  const handleEmailChanged = (newEmail) => {
    setCurrentEmail(newEmail);
    console.log('Email successfully changed to:', newEmail);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLogout) onLogout();
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClose) onClose();
  };

  const handleUpgradeClick = (e) => {
    e.preventDefault();
    // Add your upgrade logic here
    console.log('Upgrade to Pro clicked');
  };

  return (
    <>
      {showEmailModal && (
        <ChangeEmailModal
          currentEmail={currentEmail}
          onClose={handleCloseEmailModal}
          onEmailChanged={handleEmailChanged}
        />
      )}

      <div
        className="profile-dropdown"
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="profile-dropdown-plan-header">
          <span className="plan-label">{loading ? 'Loading...' : `${planDisplay} Plan`}</span>
          <button
            className="close-button"
            onClick={handleCloseClick}
            type="button"
            aria-label="Close dropdown"
            style={{ cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        {/* Profile Info */}
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
              <button className="change-link" onClick={handleChangeEmail} type="button">
                change
              </button>
            </div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="profile-plan-section">
          <div className="plan-info">
            <img src={Creditcard} alt="card" />
            <span className="plan-text">
              Current plan: {isProUser && <img src={Star} alt="Pro" style={{ width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle' }} />}<strong>{planDisplay}</strong>
            </span>
            {isFree && (
              <a href="#" className="upgrade-link" onClick={handleUpgradeClick}>
                Upgrade to Pro
              </a>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="profile-logout-section">
          <button className="logout-button" onClick={handleLogoutClick} type="button">
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

        {/* Help */}
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
          <a href="mailto:byndhq@gmail.com" className="email-link">
            Email us
          </a>
        </div>
      </div>
    </>
  );
}