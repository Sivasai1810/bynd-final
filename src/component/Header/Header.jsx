// import React from 'react';
// import Search from "../../assets/search.svg";
// import Addsymbol from "../../assets/addsymbol.svg";
// import Profile from "../../assets/Profiles.svg";
// import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
// import './Header.css';

// export default function Header({ 
//   onNewSubmission, 
//   profile, 
//   showProfileDropdown, 
//   setShowProfileDropdown,
//   onLogout 
// }) {
//   return (
//     <div className="header">
//       <div className="search-container">
//         <img src={Search} alt="Search" className="search-icon" />
//         <input type="text" placeholder="Search assignments" className="search-input" />
//       </div>
//       {/* <button onClick={onNewSubmission} className="new-submission-btn">
//         <img src={Addsymbol} alt="Add" className="btn-icon" />
//         <span>New submission</span>
//       </button> */}
//        <button className="new-submission-btn" onClick={onNewSubmission}>
//           <svg className='btn-icon'width="10" height="10" viewBox="0 0 20 20" fill="none">
//             <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//           New submission
//         </button>
//       <div 
//         className="avatar-container"
//         onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//       >
//         <div className="avatar">
//           <img src={Profile} alt="User Avatar" className="avatar-img" />
//         </div>
//         {showProfileDropdown && profile && (
//           <ProfileDropdown profile={profile} onLogout={onLogout} />
//         )}
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { useState, useEffect } from 'react';
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
  onLogout,
  onSearch 
}) {
  const handleCloseDropdown = () => {
    setShowProfileDropdown(false);
  };

  const [localSearch, setLocalSearch] = useState("");


  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(localSearch);     
    }, 300);

    return () => clearTimeout(timeout);
  }, [localSearch, onSearch]);


  return (
    <div className="header">
      <div className="search-container">
        <img src={Search} alt="Search" className="search-icon" />
        <input type="text" placeholder="Search assignments" className="search-input" value={localSearch}   onChange={(e) => setLocalSearch(e.target.value)}  />
      </div>
      {/* <button onClick={onNewSubmission} className="new-submission-btn">
        <img src={Addsymbol} alt="Add" className="btn-icon" />
        <span>New submission</span>
      </button> */}
       <button className="new-submission-btn" onClick={onNewSubmission}>
          <svg className='btn-icon'width="10" height="10" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New submission
        </button>
      <div 
        className="avatar-container"
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
      >
        <div className="avatar">
          <img src={Profile} alt="User Avatar" className="avatar-img" />
        </div>
        {showProfileDropdown && profile && (
          <ProfileDropdown 
            profile={profile} 
            onClose={handleCloseDropdown}
            onLogout={onLogout} 
          />
        )}
      </div>
    </div>
  );
}