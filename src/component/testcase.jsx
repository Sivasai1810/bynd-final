import React, { useState, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { supabase } from '../../auth/supabase.js';

export default function Header() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profile, setProfile] = useState({
    user_name: 'Mohammed Ayaan',
    user_email: 'mohdayaan@gmail.com',
    avatar_url: 'https://via.placeholder.com/48'
  });

  // Fetch current user email from Supabase on mount
  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setProfile(prev => ({
          ...prev,
          user_email: data.user.email
        }));
      }
    };

    fetchUserEmail();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.email) {
        setProfile(prev => ({
          ...prev,
          user_email: session.user.email
        }));
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowProfileDropdown(false);
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleCloseProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  const handleEmailChanged = (newEmail) => {
    // Update local profile state
    setProfile(prev => ({
      ...prev,
      user_email: newEmail
    }));
    
    console.log('Email updated successfully to:', newEmail);
    
    // Close dropdown after email change
    setTimeout(() => {
      setShowProfileDropdown(false);
    }, 1000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h1>Dashboard</h1>
        
        {/* Avatar Button to Toggle Dropdown */}
        <button
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            position: 'relative'
          }}
          aria-label="Profile menu"
        >
          {profile?.avatar_url && (
            <img
              src={profile.avatar_url}
              alt="Profile"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #e5e7eb'
              }}
            />
          )}
        </button>
      </header>

      {/* Show dropdown when toggled */}
      {showProfileDropdown && (
        <ProfileDropdown
          profile={profile}
          onLogout={handleLogout}
          onClose={handleCloseProfileDropdown}
          onEmailChanged={handleEmailChanged}
        />
      )}

      {/* Click outside to close dropdown */}
      {showProfileDropdown && (
        <div
          onClick={handleCloseProfileDropdown}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9997 // Behind dropdown
          }}
        />
      )}
    </div>
  );
}