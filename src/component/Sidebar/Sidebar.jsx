import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import Logo from "../../assets/byndlogo.svg";
import Addsymbol from "../../assets/addsymbol.svg";
import Dashsymbol from "../../assets/dashsymbol.svg";
import Analytics from "../../assets/Analytics.svg";
import Notification from "../../assets/sidenotification.svg";
import Trialbanner from "../../component/14daysfree/14daysbanner";
import './Sidebar.css';

export default function Sidebar({ onNewSubmission }) {
  const navigate = useNavigate(); // Add this hook
  const [showTrialBanner, setShowTrialBanner] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  const handleAnalyticsClick = () => {
    setShowTrialBanner(true);
    setIsMobileMenuOpen(false);
    setActiveMenuItem('analytics');
  };

  const handleNotificationClick = () => {
    setShowTrialBanner(true);
    setIsMobileMenuOpen(false);
    setActiveMenuItem('notifications');
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
  };

  const handleUpgradeClick = () => {
    navigate('/Pricingtable'); // Navigate to pricing route
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {!isMobileMenuOpen && (
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={toggleMobileMenu}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isMobileMenuOpen ? 'sidebar-open' : ''}`}>
        {/* Close button inside sidebar - only on mobile */}
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
            <span>Notification</span>
          </button>
        </div>

        <div className="upgrade-card">
          <p className="upgrade-text">
            Get real-time insights, alerts & unlimited submissions — free for 14 days.
          </p>
          <button className="upgrade-button" onClick={handleUpgradeClick}>
            Upgrade to Pro
          </button>
        </div>

        {showTrialBanner && (
          <Trialbanner onClose={handleCloseBanner} />
        )}
      </div>
    </>
  );
}