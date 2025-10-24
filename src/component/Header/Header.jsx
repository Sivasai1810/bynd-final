import React from 'react';
import Search from "../../assets/search.svg";
import Addsymbol from "../../assets/addsymbol.svg";
import Profile from "../../assets/Profiles.svg";
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import './Header.css';

export default function Header({ 
  onNewSubmission, 
  profile, 
  showProfileDropdown, 
  setShowProfileDropdown,
  onLogout 
}) {
  return (
    <div className="header">
      <div className="search-container">
        <img src={Search} alt="Search" className="search-icon" />
        <input type="text" placeholder="Search assignments" className="search-input" />
      </div>
      <button onClick={onNewSubmission} className="new-submission-btn">
        <img src={Addsymbol} alt="Add" className="btn-icon" />
        <span>New submission</span>
      </button>
      <div 
        className="avatar-container"
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
      >
        <div className="avatar">
          <img src={Profile} alt="User Avatar" className="avatar-img" />
        </div>
        {showProfileDropdown && profile && (
          <ProfileDropdown profile={profile} onLogout={onLogout} />
        )}
      </div>
    </div>
  );
}