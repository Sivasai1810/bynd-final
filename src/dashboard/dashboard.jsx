// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../auth/supabase';
// import { nanoid } from 'nanoid';
// import '../dashboard/dashboard.css';
// import Logo from "../assets/byndlogo.svg";
// import Addsymbol from "../assets/addsymbol.svg";
// import Profile from "../assets/Profiles.svg";
// import Dashsymbol from "../assets/dashsymbol.svg";
// import Analytics from "../assets/Analytics.svg";
// import Notification from "../assets/sidenotification.svg";
// import Search from "../assets/search.svg";
// import Activesubmission from "../assets/activesubmission.svg";
// import Availableslots from "../assets/available slots.svg";
// import Counts from "../assets/count.svg";
// import Lastviewed from "../assets/lastviewed.svg";
// import Upgradetopro from "../assets/upgradetopro.svg";
// import Prorocket from "../assets/prorocket.svg";
// import axios from "axios"
// import DeleteOptionButton from '../component/deleteoption';

// // Notification Component
// const Toast = ({ message, onClose }) => {
//   const [progress, setProgress] = useState(100);

//   useEffect(() => {
//     const duration = 3000;
//     const interval = 10;
//     const decrement = (interval / duration) * 100;

//     const timer = setInterval(() => {
//       setProgress(prev => {
//         const newProgress = prev - decrement;
//         if (newProgress <= 0) {
//           clearInterval(timer);
//           onClose();
//           return 0;
//         }
//         return newProgress;
//       });
//     }, interval);

//     return () => clearInterval(timer);
//   }, [onClose]);

//   return (
//     <div style={{
//       position: 'fixed',
//       top: '20px',
//       right: '20px',
//       backgroundColor: 'white',
//       padding: '16px 20px',
//       borderRadius: '8px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//       minWidth: '300px',
//       maxWidth: '400px',
//       zIndex: 9999,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       gap: '12px'
//     }}>
//       <span style={{ 
//         flex: 1, 
//         fontSize: '14px', 
//         color: '#333',
//         fontWeight: '500'
//       }}>
//         {message}
//       </span>
//       <button 
//         onClick={onClose}
//         style={{
//           background: 'none',
//           border: 'none',
//           fontSize: '20px',
//           color: '#999',
//           cursor: 'pointer',
//           padding: '0',
//           width: '24px',
//           height: '24px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           lineHeight: '1'
//         }}
//       >
//         ×
//       </button>
//       <div style={{
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         height: '3px',
//         width: `${progress}%`,
//         backgroundColor: '#1DBC79',
//         transition: 'width 0.01s linear',
//         borderBottomRightRadius: progress > 5 ? '0' : '8px',
//         borderBottomLeftRadius: '8px'
//       }} />
//     </div>
//   );
// };

// // Profile Dropdown Component
// const ProfileDropdown = ({ profile, onLogout }) => {
//   return (
//     <div style={{
//       position: 'absolute',
//       top: '70px',
//       right: '20px',
//       backgroundColor: 'white',
//       borderRadius: '8px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//       padding: '16px',
//       minWidth: '300px',
//       zIndex: 9998
//     }}>
//       <div style={{
//         textAlign: 'center',
//         paddingBottom: '16px',
//         borderBottom: '1px solid #e0e0e0'
//       }}>
//         {profile?.avatar_url && (
//           <img 
//             src={profile.avatar_url} 
//             alt="Avatar" 
//             style={{
//               width: '60px',
//               height: '60px',
//               borderRadius: '50%',
//               marginBottom: '12px',
//               objectFit: 'cover'
//             }}
//           />
//         )}
//         <p style={{
//           margin: '0 0 8px 0',
//           fontSize: '16px',
//           fontWeight: '600',
//           color: '#333'
//         }}>
//           {profile?.user_name || 'User'}
//         </p>
//         <p style={{
//           margin: '0',
//           fontSize: '14px',
//           color: '#666'
//         }}>
//           {profile?.user_email || 'email@example.com'}
//         </p>
//       </div>
//       <button 
//         onClick={onLogout}
//         style={{
//           width: '100%',
//           marginTop: '12px',
//           padding: '10px 16px',
//           backgroundColor: '#ff4757',
//           color: 'white',
//           border: 'none',
//           borderRadius: '6px',
//           fontSize: '14px',
//           fontWeight: '600',
//           cursor: 'pointer',
//           transition: 'background-color 0.2s'
//         }}
//         onMouseEnter={(e) => e.target.style.backgroundColor = '#ff3838'}
//         onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4757'}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default function Dashboard() {
//   const navigate = useNavigate();

//   // Form & Data States
//   const [showForm, setShowForm] = useState(false);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [pastedUrl, setPastedUrl] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [position, setPosition] = useState("");
//   const [designInfo, setDesignInfo] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Stats States
//   const [stats, setStats] = useState({
//     active_submissions: 0,
//     available_slots: 3,
//     total_assignments_viewed: 0,
//     last_viewed_assignment: null
//   });
  
//   // Profile & Notification States
//   const [notification, setNotification] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [submissionsLoading, setSubmissionsLoading] = useState(false);

//   // Fetch profile from Supabase Auth
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
        
//         const { data: { user }, error } = await supabase.auth.getUser();
        
//         if (error) {
//           console.error('Error fetching user:', error);
//           showNotification('Failed to load profile');
//           navigate('/login');
//           return;
//         }
        
//         if (user) {
//           setUserId(user.id);
          
//           setProfile({
//             user_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
//             user_email: user.email,
//             avatar_url: user.user_metadata?.avatar_url || null
//           });
          
//           console.log('User UID:', user.id);
//         } else {
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         showNotification('Failed to load profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   // Fetch submissions data with stats
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (!userId) return;
      
//       try {
//         setSubmissionsLoading(true);
//         const res = await axios.get("http://localhost:3000/userurls", { 
//           params: { user_id: userId },
//           withCredentials: true 
//         });
        
//         console.log("Submissions fetched:", res.data);
        
//         if (res.data.success && res.data.submissions) {
//           const formattedSubmissions = res.data.submissions.map((submission) => ({
//             id: submission.id,
//             pastedUrl: submission.original_url,
//             companyName: submission.company_name,
//             position: submission.position,
//             submittedOn: submission.created_at 
//               ? new Date(submission.created_at).toLocaleDateString('en-CA') 
//               : 'N/A',
//             status: submission.status,
//             shareableLink: submission.shareable_link,
//             uniqueId: submission.unique_id,
//             embedUrl: submission.embed_url,
//             designType: submission.design_type,
//             pdfFilePath: submission.pdf_file_path,
//             totalViews: submission.total_views || 0,
//             lastViewedAt: submission.last_viewed_at
//           }));
          
//           setDesignInfo(formattedSubmissions);
          
//           // Update stats from backend response
//           if (res.data.stats) {
//             setStats(res.data.stats);
//             console.log("Stats updated:", res.data.stats);
//           }
//         } else {
//           setDesignInfo([]);
//           // Reset stats if no submissions
//           setStats({
//             active_submissions: 0,
//             available_slots: 3,
//             total_assignments_viewed: 0,
//             last_viewed_assignment: null
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching submissions:', error);
        
//         if (error.response?.status === 401) {
//           showNotification('Session expired. Please login again.');
//           navigate('/login');
//         } else {
//           showNotification('Failed to load submissions');
//         }
        
//         setDesignInfo([]);
//       } finally {
//         setSubmissionsLoading(false);
//       }
//     };

//     fetchSubmissions();
    
//     // Auto-refresh every 30 seconds to catch view updates
//     const interval = setInterval(fetchSubmissions, 30000);
//     return () => clearInterval(interval);
    
//   }, [userId, navigate]); 

//   const showNotification = (message) => {
//     setNotification(message);
//   };

//   const closeNotification = () => {
//     setNotification(null);
//   };

//   const handleCopyLink = (shareableLink) => {
//     if (!shareableLink) {
//       showNotification("No link available to copy");
//       return;
//     }

//     navigator.clipboard.writeText(shareableLink).then(() => {
//       showNotification("BYND link copied to your clipboard");
//     }).catch(() => {
//       showNotification("Failed to copy link");
//     });
//   };

//   const handleLogout = async () => {
//     try {
//       await supabase.auth.signOut();
//       setProfile(null);
//       setUserId(null);
//       setShowProfileDropdown(false);
//       navigate('/login');
//     } catch (error) {
//       console.error('Error logging out:', error);
//       showNotification('Failed to logout');
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (showProfileDropdown && !e.target.closest('.avatar-container')) {
//         setShowProfileDropdown(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [showProfileDropdown]);

//   const handleShowForm = () => {
//     if (stats.available_slots > 0) {
//       setShowForm(true);
//     } else {
//       showNotification("Maximum 3 submissions allowed!");
//     }
//   };

//   const handleStoreData = async () => {
//     try {
//       setIsSubmitting(true);

//       if (!userId) {
//         showNotification('Please log in to submit designs');
//         return;
//       }

//       const uniqueId = nanoid(10);
//       const designType = pdfFile ? 'pdf' : 'figma';

//       let response;
//       if (pdfFile) {
//         const formData = new FormData();
//         formData.append('user_id', userId);
//         formData.append('unique_id', uniqueId);
//         formData.append('design_type', 'pdf');
//         formData.append('pdf_file', pdfFile);
//         formData.append('company_name', companyName.trim());
//         formData.append('position', position.trim());
//         formData.append('status', 'pending');

//         response = await axios.post(
//           "http://localhost:3000/storeurls",
//           formData,
//           { 
//             withCredentials: true,
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         );
//       } else {
//         const payload = {
//           user_id: userId,
//           unique_id: uniqueId,
//           design_type: designType,
//           original_url: pastedUrl.trim(),
//           pdf_file_path: null,
//           company_name: companyName.trim(),
//           position: position.trim(),
//           status: "pending"
//         };

//         response = await axios.post(
//           "http://localhost:3000/storeurls",
//           payload,
//           { 
//             withCredentials: true,
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           }
//         );
//       }

//       console.log("Response from backend:", response.data);

//       const newSubmission = {
//         id: response.data.submission?.id || uniqueId,
//         pastedUrl: designType === 'figma' ? pastedUrl.trim() : null,
//         companyName: companyName.trim(),
//         position: position.trim(),
//         submittedOn: new Date().toLocaleDateString('en-CA'),
//         status: "pending",
//         shareableLink: response.data.shareable_link || response.data.shareableLink,
//         uniqueId: uniqueId,
//         designType: designType,
//         totalViews: 0
//       };

//       setDesignInfo(prev => [...prev, newSubmission]);

//       // Update stats
//       setStats(prev => ({
//         ...prev,
//         active_submissions: prev.active_submissions + 1,
//         available_slots: Math.max(prev.available_slots - 1, 0)
//       }));

//       setPdfFile(null);
//       setPastedUrl("");
//       setCompanyName("");
//       setPosition("");
//       setShowForm(false);
      
//       showNotification("Design submission added successfully!");

//     } catch (error) {
//       console.error('Error submitting data:', error);
      
//       let errorMessage = "Failed to submit design";
//       if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       showNotification(errorMessage);
      
//       setPdfFile(null);
//       setPastedUrl("");
//       setCompanyName("");
//       setPosition("");
//       setShowForm(false);
      
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container">
//       {notification && (
//         <Toast message={notification} onClose={closeNotification} />
//       )}

//       <div className="sidebar">
//         <div className="logo">
//           <img src={Logo} alt="BYND Logo" className="logo-img" />
//         </div>

//         <div className="section">
//           <div className="section-label">MAIN</div>
//           <button className="menu-item" onClick={handleShowForm}>
//             <img src={Addsymbol} alt="Add" className="menu-icon" />
//             <span>New Design Submission</span>
//           </button>
//           <button className="menu-item">
//             <img src={Dashsymbol} alt="Dashboard" className="menu-icon" />
//             <span>Dashboard</span>
//           </button>
//         </div>

//         <div className="section">
//           <div className="section-label">PRO</div>
//           <button className="menu-item">
//             <img src={Analytics} alt="Analytics" className="menu-icon" />
//             <span>Analytics</span>
//           </button>
//           <button className="menu-item">
//             <img src={Notification} alt="Notifications" className="menu-icon" />
//             <span>Notification</span>
//           </button>
//         </div>

//         <div className="upgrade-card">
//           <p className="upgrade-text">
//             Get real-time insights, alerts & unlimited submissions — free for 14 days.
//           </p>
//           <button className="upgrade-button">Upgrade to Pro</button>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="header">
//           <div className="search-container">
//             <img src={Search} alt="Search" className="search-icon" />
//             <input type="text" placeholder="Search assignments" className="search-input" />
//           </div>
//           <button onClick={handleShowForm} className="new-submission-btn">
//             <img src={Addsymbol} alt="Add" className="btn-icon" />
//             <span>New submission</span>
//           </button>
//           <div 
//             className="avatar-container" 
//             style={{ position: 'relative' }}
//             onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//           >
//             <div className="avatar" style={{ cursor: 'pointer' }}>
//               <img src={Profile} alt="User Avatar" className="avatar-img" />
//             </div>
//             {showProfileDropdown && profile && (
//               <ProfileDropdown profile={profile} onLogout={handleLogout} />
//             )}
//           </div>
//         </div>

//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-icon"><img src={Activesubmission} alt="Active submissions" /></div>
//             <div className="stat-label">Active submissions</div>
//             <div className="stat-value">{stats.active_submissions}</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon"><img src={Availableslots} alt="Available slots" /></div>
//             <div className="stat-label">Available slots</div>
//             <div className="stat-value">{stats.available_slots}</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon"><img src={Counts} alt="Total assignments viewed" /></div>
//             <div className="stat-label">Total assignments viewed</div>
//             <div className="stat-value">{stats.total_assignments_viewed}</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon"><img src={Lastviewed} alt="Last assignment viewed" /></div>
//             <div className="stat-label">Last assignment viewed</div>
//             <div className="stat-value">
//               {stats.last_viewed_assignment ? stats.last_viewed_assignment.company_name : 'None'}
//             </div>
//           </div>
//         </div>

//         <div className="pro-banner">
//           <div className="pro-banner-content">
//             <div className="pro-banner-text">
//               <p className="pro-banner-title">
//                 Unlock powerful insights and notifications to stand out — upgrade to Pro and enjoy a 14-day <strong>free</strong> trial today.
//               </p>
//               <button className="upgrade-pro-btn">
//                 <img className='prorocket' src={Prorocket} alt="Upgrade" />
//                 <span> Upgrade to Pro</span>
//               </button>
//               <span className="no-credit-card">No credit card required</span>
//             </div>
//           </div>
//           <img src={Upgradetopro} alt="Pro illustration" className="pro-illustration" />
//         </div>

//         <h2 className="table-title">Design Submissions</h2>
//         <div className="table-container">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>S.No.</th>
//                 <th>Company name</th>
//                 <th>Position</th>
//                 <th>Submitted on</th>
//                 <th>Status</th>
//                 <th>Views</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissionsLoading ? (
//                 <tr>
//                   <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
//                     LOADING...
//                   </td>
//                 </tr>
//               ) : designInfo.length > 0 ? (
//                 designInfo.map((submission, index) => (
//                   <tr key={submission.id}>
//                     <td>{index + 1}</td>
//                     <td>{submission.companyName}</td>
//                     <td>{submission.position}</td>
//                     <td>{submission.submittedOn}</td>
//                     <td>
//                       <span className={`status-badge status-${submission.status}`}>
//                         {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
//                       </span>
//                     </td>
//                     <td>{submission.totalViews || 0}</td>
//                     <td>
//                       <button 
//                         className="action-btn"
//                         onClick={() => handleCopyLink(submission.shareableLink)}
//                       >
//                         Copy BYND Link
//                       </button>
//                       <button className="more-btn">⋮</button>
                    
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
//                     NO DATA FOUND
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showForm && (
//         <div className='form-container'>
//           <div className='form-box'>
//             <p className='close-btn' onClick={() => setShowForm(false)}>x</p>
//             <div className='header-text'><p>New <span>Design</span> Submission</p></div>
//             <span className='side-heading'>Upload Design PDF (Optional)</span>
//             <input 
//               type='file' 
//               accept=".pdf"
//               className='fields' 
//               onChange={(e) => setPdfFile(e.target.files[0])} 
//               disabled={pastedUrl.trim() !== ""}
//             />
//             <span className='side-heading'>Paste Design URL*</span>
//             <input 
//               type='text' 
//               className='fields' 
//               value={pastedUrl} 
//               onChange={(e) => setPastedUrl(e.target.value)} 
//               placeholder='http://examplefigma-url.com' 
//               disabled={pdfFile !== null}
//             />

//             <span className='side-heading'>Company Name*</span>
//             <input 
//               type='text' 
//               className='fields' 
//               value={companyName} 
//               onChange={(e) => setCompanyName(e.target.value)} 
//               placeholder='Enter Company name'
//             />

//             <span className='side-heading'>Position*</span>
//             <input 
//               type='text' 
//               className='fields' 
//               value={position} 
//               onChange={(e) => setPosition(e.target.value)} 
//               placeholder='Enter position'
//             />

//             <button 
//               onClick={handleStoreData} 
//               disabled={!companyName || !position || (!pdfFile && !pastedUrl) || isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useSubmissions } from '../hooks/useSubmissions';
import Toast from '../component/Toast/Toast';
import Sidebar from '../component/Sidebar/Sidebar';
import Header from '../component/Header/Header';
import StatsGrid from '../component/StatsGrid/StatsGrid';
import ProBanner from '../component/ProBanner/ProBanner';
import SubmissionsTable from '../component/SubmissionsTable/SubmissionsTable';
import SubmissionForm from '../component/SubmissionForm/SubmissionForm';
import EmptyState from '../component/EmptyState/EmptyState';
import SuccessModal from '../component/SuccessModal/SuccessModal';
import './dashboard.css';

export default function Dashboard() {
  const { profile, userId, logout } = useAuth();
  const { submissions, setSubmissions, stats, setStats, loading: submissionsLoading, deleteSubmission } = useSubmissions(userId);
  
  const [showForm, setShowForm] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pastedUrl, setPastedUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedShareableLink, setSubmittedShareableLink] = useState("");

  const hasNoSubmissions = !submissionsLoading && submissions.length === 0;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showProfileDropdown && !e.target.closest('.avatar-container')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileDropdown]);

  const showNotification = (message) => {
    setNotification(message);
  };

  const handleShowForm = () => {
    if (stats.available_slots > 0) {
      setShowForm(true);
      setPdfFile(null);
      setPastedUrl("");
      setCompanyName("");
      setPosition("");
    } else {
      showNotification("Maximum 3 submissions allowed!");
    }
  };

  const handleCopyLink = (shareableLink) => {
    if (!shareableLink) {
      showNotification("No link available to copy");
      return;
    }

    navigator.clipboard.writeText(shareableLink).then(() => {
      showNotification("BYND link copied to your clipboard");
    }).catch(() => {
      showNotification("Failed to copy link");
    });
  };

  const handleDelete = async (uniqueId) => {
    try {
      const success = await deleteSubmission(uniqueId);
      if (success) {
        showNotification("Submission deleted successfully!");
      } else {
        showNotification("Failed to delete submission");
      }
    } catch (error) {
      showNotification("Error deleting submission");
    }
  };

  const handleStoreData = async () => {
    try {
      setIsSubmitting(true);

      if (!userId) {
        showNotification('Please log in to submit designs');
        return;
      }

      const uniqueId = nanoid(10);
      
      // Determine design type based on input
     let designType;
if (pdfFile) {
  const fileType = pdfFile.type;
  if (fileType === "application/pdf") {
    designType = "pdf";
  } else if (fileType === "image/png" || fileType === "image/jpeg" || fileType === "image/jpg") {
    designType = "image";
  } else {
    showNotification("Please upload only PDF, PNG, or JPEG files.");
    return;
  }
} else if (pastedUrl.trim()) {
  if (pastedUrl.includes("figma.com")) {
    designType = "figma";
  } else {
    showNotification("Please provide a valid Figma link.");
    return;
  }
} else {
  showNotification("Please provide a Figma link or upload a file.");
  return;
}

      console.log('Submitting with design type:', designType);

      let response;
      if (pdfFile) {
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('unique_id', uniqueId);
        formData.append('design_type', designType);
        formData.append('pdf_file', pdfFile); // Field name stays as 'pdf_file' for backend compatibility
        formData.append('company_name', companyName.trim());
        formData.append('position', position.trim());
        formData.append('status', 'pending');
        console.log('Sending FormData to server...');
        response = await axios.post(
          // https://bynd-backend.onrender.com
          "https://bynd-backend.onrender.com/storeurls",
          formData,
          { 
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
      } else {
        const payload = {
          user_id: userId,
          unique_id: uniqueId,
          design_type: designType,
          original_url: pastedUrl.trim(),
          pdf_file_path: null,
          company_name: companyName.trim(),
          position: position.trim(),
          status: "pending"
        };

        console.log('Sending JSON payload to server...');
//
        response = await axios.post(
          "https://bynd-backend.onrender.com/storeurls",
          payload,
          { 
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      console.log('Server response:', response.data);

      const shareableLink = response.data.shareable_link || response.data.shareableLink;

      const newSubmission = {
        id: response.data.submission?.id || uniqueId,
        pastedUrl: designType === 'figma' ? pastedUrl.trim() : null,
        companyName: companyName.trim(),
        position: position.trim(),
        submittedOn: new Date().toLocaleDateString('en-CA'),
        status: "pending",
        shareableLink: shareableLink,
        uniqueId: uniqueId,
        designType: designType,
        totalViews: 0
      };

      setSubmissions(prev => [...prev, newSubmission]);
      setStats(prev => ({
        ...prev,
        active_submissions: prev.active_submissions + 1,
        available_slots: Math.max(prev.available_slots - 1, 0)
      }));

      setPdfFile(null);
      setPastedUrl("");
      setCompanyName("");
      setPosition("");
      setShowForm(false);
      
      // Show success modal instead of toast
      setSubmittedShareableLink(shareableLink);
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error submitting data:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = "Failed to submit design";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.details) {
        errorMessage = error.response.data.details;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showNotification(errorMessage);
      
      setPdfFile(null);
      setPastedUrl("");
      setCompanyName("");
      setPosition("");
      setShowForm(false);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {notification && (
        <Toast message={notification} onClose={() => setNotification(null)} />
      )}

      <Sidebar onNewSubmission={handleShowForm} />

      <div className="main-content">
        <Header 
          onNewSubmission={handleShowForm}
          profile={profile}
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          onLogout={logout}
        />

        {hasNoSubmissions ? (
          <EmptyState onNewSubmission={handleShowForm} />
        ) : (
          <>
            <StatsGrid stats={stats} />
            <ProBanner />
            <SubmissionsTable 
              submissions={submissions}
              loading={submissionsLoading}
              onCopyLink={handleCopyLink}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>

      <SubmissionForm
        showForm={showForm}
        onClose={() => setShowForm(false)}
        pdfFile={pdfFile}
        setPdfFile={setPdfFile}
        pastedUrl={pastedUrl}
        setPastedUrl={setPastedUrl}
        companyName={companyName}
        setCompanyName={setCompanyName}
        position={position}
        setPosition={setPosition}
        onSubmit={handleStoreData}
        isSubmitting={isSubmitting}
      />

      <SuccessModal 
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        shareableLink={submittedShareableLink}
        onCopyLink={handleCopyLink}
      />
    </div>
  );
}