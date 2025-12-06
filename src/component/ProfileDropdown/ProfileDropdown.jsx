import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeEmailModal from '../../component/changepassword/changemail.jsx';
import Creditcard from "../../assets/creditcard.svg";
import Star from "../../assets/prostart.svg";
import useUserPlan from '../../hooks/useUserPlan';
import './ProfileDropdown.css';

export default function ProfileDropdown({ profile, onClose, onLogout }) {
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(profile?.user_email || 'mohdayaan@gmail.com');
  const dropdownRef = useRef(null);
  
  // Get user plan using the hook
  const { plan, loading, isFree, isPro, isTrial } = useUserPlan();

  const isProUser = isPro || isTrial;
  const planDisplay = isProUser ? 'Pro' : 'Free';
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       if (onClose) onClose();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [onClose]);
  useEffect(() => {
  const handleClickOutside = (event) => {
    // 🔥 If change email modal is open, DO NOT close dropdown
    if (showEmailModal) return;

    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (onClose) onClose();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [onClose, showEmailModal]);


  const handleChangeEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
  setShowEmailModal(true)
  }
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
  navigate('/pricingtable'); 
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

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../auth/supabase.js';
// import ChangeEmailModal from '../../component/changepassword/changemail.jsx';
// import Creditcard from "../../assets/creditcard.svg";
// import Star from "../../assets/prostart.svg";
// import useUserPlan from '../../hooks/useUserPlan';
// import './ProfileDropdown.css';

// export default function ProfileDropdown({ profile, onClose, onLogout }) {
//   const navigate = useNavigate();
//   const [showEmailModal, setShowEmailModal] = useState(false);
//   const [currentEmail, setCurrentEmail] = useState('');
//   const dropdownRef = useRef(null);
  
//   // Get user plan using the hook
//   const { plan, loading, isFree, isPro, isTrial } = useUserPlan();

//   const isProUser = isPro || isTrial;
//   const planDisplay = isProUser ? 'Pro' : 'Free';

//   // Initialize email from profile or fetch from Supabase auth
//   useEffect(() => {
//     const initializeEmail = async () => {
//       // First try to use the profile email
//       if (profile?.user_email) {
//         setCurrentEmail(profile.user_email);
//         return;
//       }

//       // If not available, fetch from Supabase auth
//       try {
//         const { data: { user }, error } = await supabase.auth.getUser();
        
//         if (error) {
//           console.error('❌ Error fetching user:', error);
//           return;
//         }

//         if (user?.email) {
//           console.log('📧 Email loaded from Supabase auth:', user.email);
//           setCurrentEmail(user.email);
//         }
//       } catch (err) {
//         console.error('❌ Error initializing email:', err);
//       }
//     };

//     initializeEmail();
//   }, [profile]);

//   // Listen for auth state changes (email updates)
//   useEffect(() => {
//     const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
//       console.log('🔄 Auth event:', event);
      
//       if (event === 'USER_UPDATED' && session?.user?.email) {
//         console.log('✅ User email updated:', session.user.email);
//         setCurrentEmail(session.user.email);
        
//         // Update the profiles table
//         try {
//           const { error } = await supabase
//             .from('profiles')
//             .update({ 
//               email: session.user.email,
//               user_email: session.user.email // Update both fields if you use different column names
//             })
//             .eq('id', session.user.id);
          
//           if (error) {
//             console.error('⚠️ Error updating profile table:', error);
//           } else {
//             console.log('✅ Profile table updated successfully');
//           }
//         } catch (err) {
//           console.error('❌ Error updating profile:', err);
//         }
//       }
//     });

//     return () => {
//       authListener?.subscription?.unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // 🔥 If change email modal is open, DO NOT close dropdown
//       if (showEmailModal) return;

//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         if (onClose) onClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [onClose, showEmailModal]);

//   const handleChangeEmail = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('📧 Opening email change modal');
//     setShowEmailModal(true);
//   };

//   const handleCloseEmailModal = () => {
//     console.log('🔚 Closing email modal');
//     setShowEmailModal(false);
//   };

//   const handleEmailChanged = async (newEmail) => {
//     console.log('✅ Email successfully changed to:', newEmail);
//     setCurrentEmail(newEmail);
    
//     // Update the profile state if you have a callback
//     // You might want to refresh the parent component's profile data here
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
      
//       if (user) {
//         // Update profiles table
//         const { error } = await supabase
//           .from('profiles')
//           .update({ 
//             email: newEmail,
//             user_email: newEmail
//           })
//           .eq('id', user.id);
        
//         if (error) {
//           console.error('⚠️ Error updating profile:', error);
//         } else {
//           console.log('✅ Profile updated in callback');
//         }
//       }
//     } catch (err) {
//       console.error('❌ Error in email changed callback:', err);
//     }
//   };

//   const handleLogoutClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (onLogout) onLogout();
//   };

//   const handleCloseClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (onClose) onClose();
//   };

//   const handleUpgradeClick = (e) => {
//     e.preventDefault();
//     navigate('/pricingtable'); 
//   };

//   return (
//     <>
//       {showEmailModal && (
//         <ChangeEmailModal
//           currentEmail={currentEmail}
//           onClose={handleCloseEmailModal}
//           onEmailChanged={handleEmailChanged}
//         />
//       )}

//       <div
//         className="profile-dropdown"
//         ref={dropdownRef}
//         onClick={(e) => e.stopPropagation()} 
//       >
//         {/* Header */}
//         <div className="profile-dropdown-plan-header">
//           <span className="plan-label">{loading ? 'Loading...' : `${planDisplay} Plan`}</span>
//           <button
//             className="close-button"
//             onClick={handleCloseClick}
//             type="button"
//             aria-label="Close dropdown"
//             style={{ cursor: 'pointer' }}
//           >
//             ×
//           </button>
//         </div>

//         {/* Profile Info */}
//         <div className="profile-dropdown-info">
//           <div className="profile-avatar-section">
//             {profile?.avatar_url && (
//               <img
//                 src={profile.avatar_url}
//                 alt="Profile"
//                 className="profile-dropdown-avatar"
//               />
//             )}
//           </div>

//           <div className="profile-details">
//             <h3 className="profile-dropdown-name">
//               {profile?.user_name || 'User'}
//             </h3>

//             <div className="profile-email-row">
//               <p className="profile-dropdown-email">{currentEmail || 'Loading...'}</p>
//               <button className="change-link" onClick={handleChangeEmail} type="button">
//                 change
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Current Plan */}
//         <div className="profile-plan-section">
//           <div className="plan-info">
//             <img src={Creditcard} alt="card" />
//             <span className="plan-text">
//               Current plan: {isProUser && <img src={Star} alt="Pro" style={{ width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle' }} />}<strong>{planDisplay}</strong>
//             </span>
//             {isFree && (
//               <a href="#" className="upgrade-link" onClick={handleUpgradeClick}>
//                 Upgrade to Pro
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Logout */}
//         <div className="profile-logout-section">
//           <button className="logout-button" onClick={handleLogoutClick} type="button">
//             <svg
//               className="logout-icon"
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M7 16H3C2.46957 16 1.96086 15.7893 1.58579 15.4142C1.21071 15.0391 1 14.5304 1 14V4C1 3.46957 1.21071 2.96086 1.58579 2.58579C1.96086 2.21071 2.46957 2 3 2H7M12 13L17 9L12 5M17 9H7"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <span>Log out</span>
//           </button>
//         </div>

//         {/* Help */}
//         <div className="profile-help-section">
//           <svg
//             className="help-icon"
//             width="16"
//             height="16"
//             viewBox="0 0 16 16"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
//             <path
//               d="M8 12V12.01M8 9C8 8.5 8.5 8 9 7.5C9.5 7 10 6.5 10 5.5C10 4.5 9 4 8 4C7 4 6 4.5 6 5.5"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//           <span className="help-text">Need help?</span>
//           <a href="mailto:byndhq@gmail.com" className="email-link">
//             Email us
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }