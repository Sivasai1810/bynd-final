import React from 'react';
import './ProfileDropdown.css';

export default function ProfileDropdown({ profile, onLogout }) {
  return (
    <div className="profile-dropdown">
      <div className="profile-dropdown-header">
        {profile?.avatar_url && (
          <img 
            src={profile.avatar_url} 
            alt="Avatar" 
            className="profile-dropdown-avatar"
          />
        )}
        <p className="profile-dropdown-name">
          {profile?.user_name || 'User'}
        </p>
        <p className="profile-dropdown-email">
          {profile?.user_email || 'email@example.com'}
        </p>
      </div>
      <button onClick={onLogout} className="profile-dropdown-logout">
        Logout
      </button>
    </div>
  );
}