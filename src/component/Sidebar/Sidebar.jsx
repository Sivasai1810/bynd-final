import React from 'react';
import Logo from "../../assets/byndlogo.svg";
import Addsymbol from "../../assets/addsymbol.svg";
import Dashsymbol from "../../assets/dashsymbol.svg";
import Analytics from "../../assets/Analytics.svg";
import Notification from "../../assets/sidenotification.svg";
import './Sidebar.css';

export default function Sidebar({ onNewSubmission }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="BYND Logo" className="logo-img" />
      </div>

      <div className="section">
        <div className="section-label">MAIN</div>
        <button className="menu-item" onClick={onNewSubmission}>
          <img src={Addsymbol} alt="Add" className="menu-icon" />
          <span>New Design Submission</span>
        </button>
        <button className="menu-item">
          <img src={Dashsymbol} alt="Dashboard" className="menu-icon" />
          <span>Dashboard</span>
        </button>
      </div>

      <div className="section">
        <div className="section-label">PRO</div>
        <button className="menu-item">
          <img src={Analytics} alt="Analytics" className="menu-icon" />
          <span>Analytics</span>
        </button>
        <button className="menu-item">
          <img src={Notification} alt="Notifications" className="menu-icon" />
          <span>Notification</span>
        </button>
      </div>

      <div className="upgrade-card">
        <p className="upgrade-text">
          Get real-time insights, alerts & unlimited submissions — free for 14 days.
        </p>
        <button className="upgrade-button">Upgrade to Pro</button>
      </div>
    </div>
  );
}