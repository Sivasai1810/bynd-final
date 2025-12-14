import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/byndlogo.svg";
import Addsymbol from "../../assets/addsymbol.svg";
import Dashsymbol from "../../assets/dashsymbol.svg";
import Analytics from "../../assets/Analytics.svg";
import Notification from "../../assets/sidenotification.svg";
import Trialbanner from "../../component/14daysfree/14daysbanner";
import useUserPlan from "../../hooks/useUserPlan";
import './Sidebar.css';

export default function Sidebar({ 
  onNewSubmission, 
  onNotificationClick, 
  onAnalyticsClick,
  onDashboardClick,
  isSubmissionModalOpen,
  currentView 
}) {
  const navigate = useNavigate();
  const [showTrialBanner, setShowTrialBanner] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  
  const { plan, loading, isFree, isPro, isTrial } = useUserPlan();
  
  // Sync activeMenuItem with currentView from parent
  useEffect(() => {
    if (currentView) {
      setActiveMenuItem(currentView);
    }
  }, [currentView]);
  
  // Reset to current view when submission modal closes
  useEffect(() => {
    if (!isSubmissionModalOpen && activeMenuItem === 'new-submission') {
      setActiveMenuItem(currentView || 'dashboard');
    }
  }, [isSubmissionModalOpen, activeMenuItem, currentView]);
  
  // Calculate progress
  const daysRemaining = plan?.days_remaining ?? 0;
  const totalTrialDays = 14;
  const daysCompleted = Math.max(0, totalTrialDays - daysRemaining);
  const progressPercentage = Math.min(100, Math.max(0, Math.round((daysCompleted / totalTrialDays) * 100)));


  const handleAnalyticsClick = () => {
    setIsMobileMenuOpen(false);
    setActiveMenuItem('analytics');
    
    if (isFree) {
      setShowTrialBanner(true);
    } else {
      setShowTrialBanner(false);
      if (onAnalyticsClick) {
        onAnalyticsClick();
      }
    }
  };

  const handleNotificationClick = () => {
    setIsMobileMenuOpen(false);
    setActiveMenuItem('notifications');
    
    if (isFree) {
      setShowTrialBanner(true);
    } else {
      setShowTrialBanner(false);
      if (onNotificationClick) {
        onNotificationClick();
      }
    }
  };

  const handleCloseBanner = () => {
    setShowTrialBanner(false);
    setActiveMenuItem('dashboard');
  };

  const handleNewSubmission = () => {
    onNewSubmission();
    setIsMobileMenuOpen(false);
    setActiveMenuItem('new-submission');
  };

  const handleDashboardClick = () => {
    setIsMobileMenuOpen(false);
    setActiveMenuItem('dashboard');
    setShowTrialBanner(false);
    if (onDashboardClick) {
      onDashboardClick();
    }
  };

  const handleUpgradeClick = () => {
    navigate('/Pricingtable');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {!isMobileMenuOpen && (
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}

      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={toggleMobileMenu}></div>}

      <div className={`sidebar ${isMobileMenuOpen ? 'sidebar-open' : ''}`}>
        {isMobileMenuOpen && (
          <button className="mobile-close-button" onClick={toggleMobileMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        
        <div className="logo">
          <img src={Logo} alt="BYND Logo" className="logo-img" />
        </div>

        <div className="section">
          <div className="section-label">MAIN</div>
          <button 
            className={`menu-item ${activeMenuItem === 'new-submission' ? 'active' : ''}`} 
            onClick={handleNewSubmission}
          >
            <img src={Addsymbol} alt="Add" className="menu-icon" />
            <span>New Design Submission</span>
          </button>
          <button 
            className={`menu-item ${activeMenuItem === 'dashboard' ? 'active' : ''}`} 
            onClick={handleDashboardClick}
          >
            <img src={Dashsymbol} alt="Dashboard" className="menu-icon" />
            <span>Dashboard</span>
          </button>
        </div>

        <div className="section">
          <div className="section-label">PRO</div>
          <button 
            className={`menu-item ${activeMenuItem === 'analytics' ? 'active' : ''}`} 
            onClick={handleAnalyticsClick}
          >
            <img src={Analytics} alt="Analytics" className="menu-icon" />
            <span>Analytics</span>
          </button>
          <button 
            className={`menu-item ${activeMenuItem === 'notifications' ? 'active' : ''}`} 
            onClick={handleNotificationClick}
          >
            <img src={Notification} alt="Notifications" className="menu-icon" />
            <span>Notifications</span>
          </button>
        </div>


        {isFree && (
          <div className="upgrade-card">
            <p className="upgrade-text">
              Get real-time insights, alerts & unlimited submissions — free for 14 days.
            </p>
            <button className="upgrade-button" onClick={handleUpgradeClick}>
              Upgrade to Pro
            </button>
          </div>
        )}

        {isTrial && (
          <div className="trial-progress-card">
            <div className="trial-header">
              <h3 className="trial-title">You've unlocked Pro! 🥳</h3>
              <span className="trial-progress-percentage">{progressPercentage}%</span>
            </div>
            <p className="trial-description">
              Enjoy insights, alerts & more — your 14-day trial is on.
            </p>
            <div className="trial-progress-bar">
              <div 
                className="trial-progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {isPro && (
          <div className="pro-active-card">
            <h3 className="pro-title">Pro Active 🎉</h3>
            <p className="pro-description">
              You have full access to all Pro features.
            </p>
          </div>
        )}

        {showTrialBanner && isFree && (
          <Trialbanner onClose={handleCloseBanner} />
        )}
      </div>
    </>
  );
}