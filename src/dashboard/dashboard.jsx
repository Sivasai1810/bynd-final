// import React, { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
// import axios from 'axios';
// import { useAuth } from '../hooks/useAuth';
// import { useSubmissions } from '../hooks/useSubmissions';
// import Toast from '../component/Toast/Toast';
// import Sidebar from '../component/Sidebar/Sidebar';
// import Header from '../component/Header/Header';
// import StatsGrid from '../component/StatsGrid/StatsGrid';
// import ProBanner from '../component/ProBanner/ProBanner';
// import SubmissionsTable from '../component/SubmissionsTable/SubmissionsTable';
// import SubmissionForm from '../component/SubmissionForm/SubmissionForm';
// import EmptyState from '../component/EmptyState/EmptyState';
// import SuccessModal from '../component/SuccessModal/SuccessModal';
// import TrailConfirmModal from "../Trailforms/TrailConfirmModal";
// import useUserPlan from "../hooks/useUserPlan";
// import NotificationEmptyState from '../component/EmptyState/Notification';
// import Analytics from '../component/Analytics/analytics';
// import './dashboard.css';

// export default function Dashboard() {
//   const { profile, userId, logout } = useAuth();
//   const { submissions, setSubmissions, stats, setStats, loading: submissionsLoading, deleteSubmission } = useSubmissions(userId);
//    const [searchQuery, setSearchQuery] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [pdfFile, setPdfFile] = useState([]);
//   const [pastedUrl, setPastedUrl] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [position, setPosition] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [submittedShareableLink, setSubmittedShareableLink] = useState("");
//   const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'analytics', or 'notifications'
//   const [selectedSubmissionForAnalytics, setSelectedSubmissionForAnalytics] = useState(null);

//   // Subscription state
//   const [subscription, setSubscription] = useState(null);
//   const [loadingSubscription, setLoadingSubscription] = useState(true);

//   const hasNoSubmissions = !submissionsLoading && submissions.length === 0;
//   const [showTrialModal, setShowTrialModal] = useState(false);
//   const { plan, loading, isFree, isPro, isTrial } = useUserPlan();
  
//   const shouldShowProBanner = isFree;
//   useEffect(() => {
//     const fetchUserPlan = async () => {
//       if (!userId) {
//         setLoadingSubscription(false);
//         return;
//       }

//       try {
//         setLoadingSubscription(true);
//         const response = await axios.get('https://bynd-backend.onrender.com/userplan', {
//           params: { user_id: userId },
//           withCredentials: true
//         });

//         if (response.data.subscription) {
//           setSubscription(response.data.subscription);
//           console.log('User subscription:', response.data.subscription);
//         }
//       } catch (error) {
//         console.error('Error fetching user plan:', error);
//         showNotification('Failed to load subscription details');
//       } finally {
//         setLoadingSubscription(false);
//       }
//     };

//     fetchUserPlan();
//   }, [userId]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (showProfileDropdown && !e.target.closest('.avatar-container')) {
//         setShowProfileDropdown(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [showProfileDropdown]);

//   const showNotification = (message) => {
//     setNotification(message);
//   };

//   const handleShowForm = () => {
//     // Check subscription limits based on plan
//     const isProUser = isPro || isTrial;
//     const maxSubmissions = isProUser ? Infinity : 3;
    
//     if (stats.active_submissions >= maxSubmissions) {
//       if (!isProUser) {
//         showNotification("Maximum 3 submissions allowed on free plan! Upgrade to Pro for unlimited submissions.");
//       } else {
//         showNotification("Maximum submissions reached!");
//       }
//       return;
//     }

//     // Pro users don't have slot limitations
//     if (!isProUser && stats.available_slots <= 0) {
//       showNotification("No available slots!");
//       return;
//     }

//     setShowForm(true);
//     setPdfFile(null);
//     setPastedUrl("");
//     setCompanyName("");
//     setPosition("");
//   };

//   const handleStartTrial = async () => {
//     if (!userId) {
//       showNotification('Please log in to start trial');
//       return;
//     }

//     if (subscription?.trial_used) {
//       showNotification('You have already used your free trial');
//       return;
//     }

//     try {
//       const response = await axios.post('https://bynd-backend.onrender.com/userplan/start-trial', 
//         { user_id: userId },
//         { withCredentials: true }
//       );

//       if (response.data.subscription) {
//         setSubscription(prev => ({
//           ...prev,
//           ...response.data.subscription
//         }));
//         showNotification('14-day Pro trial started successfully! 🎉');
//       }
//     } catch (error) {
//       console.error('Error starting trial:', error);
//       showNotification(error.response?.data?.error || 'Failed to start trial');
//     }
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

//   const handleDelete = async (uniqueId) => {
//     try {
//       const success = await deleteSubmission(uniqueId);
//       if (success) {
//         showNotification("Submission deleted successfully!");
//       } else {
//         showNotification("Failed to delete submission");
//       }
//     } catch (error) {
//       showNotification("Error deleting submission");
//     }
//   };

// //   const handleStoreData = async () => {
// //     try {
// //       setIsSubmitting(true);

// //       if (!userId) {
// //         showNotification('Please log in to submit designs');
// //         setIsSubmitting(false)
// //         return;
// //       }

// //       const uniqueId = nanoid(10);
      
// //       // Determine design type based on input
// //       let designType;
// //      if (Array.isArray(pdfFile) && pdfFile.length>0) {
// //   let allValid = true;

// //   selectedFiles.forEach(file => {
// //     if (
// //       file.type !== "application/pdf" &&
// //       file.type !== "image/png" &&
// //       file.type !== "image/jpeg" &&
// //       file.type !== "image/jpg"
// //     ) {
// //       allValid = false;
// //     }
// //   });

// //   if (!allValid) {
// //     showNotification("Please upload only PDF, PNG, or JPEG files.");
// //     return;
// //   }

// //   // Set design type → treat all as PDF uploads
// //   designType = "pdf";
// // }
// //  else if (pastedUrl.trim()) {
// //         if (pastedUrl.includes("figma.com")) {
// //           designType = "figma";
// //         } else {
// //           showNotification("Please provide a valid Figma link.");
// //           return;
// //         }
// //       } else {
// //         showNotification("Please provide a Figma link or upload a file.");
// //         return;
// //       }

// //       console.log('Submitting with design type:', designType);

// //       let response;
// //       if (selectedFiles.length > 0) {
// //         const formData = new FormData();
// //         formData.append('user_id', userId);
// //         formData.append('unique_id', uniqueId);
// //         formData.append('design_type', designType);
// //         // formData.append('pdf_file', pdfFile);
// //         selectedFiles.forEach((file) => {
// //   formData.append("pdf_files", file); 
// // });

// //         formData.append('company_name', companyName.trim());
// //         formData.append('position', position.trim());
// //         formData.append('status', 'pending');
        
// //         console.log('Sending FormData to server...');
// //         response = await axios.post(
// //           "http://localhost:3000/storeurls",
// //           formData,
// //           { 
// //             withCredentials: true,
// //             headers: { 'Content-Type': 'multipart/form-data' }
// //           }
// //         );
// //       } else {
// //         const payload = {
// //           user_id: userId,
// //           unique_id: uniqueId,
// //           design_type: designType,
// //           original_url: pastedUrl.trim(),
// //           pdf_file_path: null,
// //           company_name: companyName.trim(),
// //           position: position.trim(),
// //           status: "pending"
// //         };

// //         console.log('Sending JSON payload to server...');
// //         response = await axios.post(
// //           "http://localhost:3000/storeurls",
// //           payload,
// //           { 
// //             withCredentials: true,
// //             headers: { 'Content-Type': 'application/json' }
// //           }
// //         );
// //       }

// //       console.log('Server response:', response.data);

// //       const shareableLink = response.data.shareable_link || response.data.shareableLink;

// //       const newSubmission = {
// //         id: response.data.submission?.id || uniqueId,
// //         pastedUrl: designType === 'figma' ? pastedUrl.trim() : null,
// //         companyName: companyName.trim(),
// //         position: position.trim(),
// //         submittedOn: new Date().toLocaleDateString('en-CA'),
// //         status: "pending",
// //         shareableLink: shareableLink,
// //         uniqueId: uniqueId,
// //         designType: designType,
// //         totalViews: 0
// //       };

// //       setSubmissions(prev => [...prev, newSubmission]);
// //       setStats(prev => ({
// //         ...prev,
// //         active_submissions: prev.active_submissions + 1,
// //         available_slots: Math.max(prev.available_slots - 1, 0)
// //       }));

// //       setPdfFile(null);
// //       setPastedUrl("");
// //       setCompanyName("");
// //       setPosition("");
// //       setShowForm(false);
      
// //       // Show success modal
// //       setSubmittedShareableLink(shareableLink);
// //       setShowSuccessModal(true);

// //     } catch (error) {
// //       console.error('Error submitting data:', error);
// //       console.error('Error response:', error.response?.data);
      
// //       let errorMessage = "Failed to submit design";
// //       if (error.response?.data?.error) {
// //         errorMessage = error.response.data.error;
// //       } else if (error.response?.data?.details) {
// //         errorMessage = error.response.data.details;
// //       } else if (error.message) {
// //         errorMessage = error.message;
// //       }
      
// //       showNotification(errorMessage);
      
// //       setPdfFile(null);
// //       setPastedUrl("");
// //       setCompanyName("");
// //       setPosition("");
// //       setShowForm(false);
      
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };





// // const handleStoreData = async () => {
// //   try {
// //     setIsSubmitting(true);

// //     if (!userId) {
// //       showNotification("Please log in to submit designs");
// //       setIsSubmitting(false);
// //       return;
// //     }

// //     const uniqueId = nanoid(10);

// //     // Determine design type
// //     let designType;

// //     // Single file case
// //     if (pdfFile) {
// //       // validate file type
// //       const validTypes = [
// //         "application/pdf",
// //         "image/png",
// //         "image/jpeg",
// //         "image/jpg",
// //       ];

// //       if (!validTypes.includes(pdfFile.type)) {
// //         showNotification("Please upload only PDF, PNG, or JPEG files.");
// //         setIsSubmitting(false);
// //         return;
// //       }

// //       designType = "pdf";

// //     } else if (pastedUrl.trim()) {
// //       if (pastedUrl.includes("figma.com")) {
// //         designType = "figma";
// //       } else {
// //         showNotification("Please provide a valid Figma link.");
// //         setIsSubmitting(false);
// //         return;
// //       }

// //     } else {
// //       showNotification("Please provide a Figma link or upload a file.");
// //       setIsSubmitting(false);
// //       return;
// //     }

// //     console.log("Submitting with design type:", designType);

// //     let response;

// //     // PDF upload flow (single file)
// //     if (pdfFile) {
// //       const formData = new FormData();
// //       formData.append("user_id", userId);
// //       formData.append("unique_id", uniqueId);
// //       formData.append("design_type", designType);
// //       formData.append("pdf_file", pdfFile); // single file
// //       formData.append("company_name", companyName.trim());
// //       formData.append("position", position.trim());
// //       formData.append("status", "pending");

// //       console.log("Sending FormData (single file) to server...");

// //       response = await axios.post(
// //         "https://bynd-backend.onrender.com/storeurls",
// //         formData,
// //         {
// //           withCredentials: true,
// //           headers: { "Content-Type": "multipart/form-data" },
// //         }
// //       );
// //     }

// //     // FIGMA URL flow
// //     else {
// //       const payload = {
// //         user_id: userId,
// //         unique_id: uniqueId,
// //         design_type: designType,
// //         original_url: pastedUrl.trim(),
// //         pdf_file_path: null,
// //         company_name: companyName.trim(),
// //         position: position.trim(),
// //         status: "pending",
// //       };

// //       console.log("Sending JSON payload to server...");

// //       response = await axios.post(
// //         "https://bynd-backend.onrender.com/storeurls",
// //         payload,
// //         {
// //           withCredentials: true,
// //           headers: { "Content-Type": "application/json" },
// //         }
// //       );
// //     }

// //     console.log("Server response:", response.data);

// //     const shareableLink =
// //       response.data.shareable_link || response.data.shareableLink;

// //     const newSubmission = {
// //       id: response.data.submission?.id || uniqueId,
// //       pastedUrl: designType === "figma" ? pastedUrl.trim() : null,
// //       companyName: companyName.trim(),
// //       position: position.trim(),
// //       submittedOn: new Date().toLocaleDateString("en-CA"),
// //       status: "pending",
// //       shareableLink,
// //       uniqueId,
// //       designType,
// //       totalViews: 0,
// //     };

// //     setSubmissions((prev) => [newSubmission, ...prev]);

// //     setStats((prev) => ({
// //       ...prev,
// //       active_submissions: (prev?.active_submissions || 0) + 1,
// //       available_slots: Math.max((prev?.available_slots || 0) - 1, 0),
// //     }));

// //     // reset form state
// //     setPdfFile(null);
// //     setPastedUrl("");
// //     setCompanyName("");
// //     setPosition("");
// //     setShowForm(false);

// //     setSubmittedShareableLink(shareableLink);
// //     setShowSuccessModal(true);

// //   } catch (error) {
// //     console.error("Error submitting data:", error);
// //     console.error("Error response:", error.response?.data);

// //     let errorMessage = "Failed to submit design";
// //     if (error.response?.data?.error) {
// //       errorMessage = error.response.data.error;
// //     } else if (error.response?.data?.details) {
// //       errorMessage = error.response.data.details;
// //     } else if (error.message) {
// //       errorMessage = error.message;
// //     }

// //     showNotification(errorMessage);

// //     // reset on error
// //     setPdfFile(null);
// //     setPastedUrl("");
// //     setCompanyName("");
// //     setPosition("");
// //     setShowForm(false);

// //   } finally {
// //     setIsSubmitting(false);
// //   }
// // };

// const handleStoreData = async () => {
//   try {
//     setIsSubmitting(true);

//     if (!userId) {
//       showNotification("Please log in to submit designs");
//       return;
//     }

//     const uniqueId = nanoid(10);
//     let designType;

//     // MULTIPLE FILE UPLOAD FLOW
//     if (Array.isArray(pdfFile) && pdfFile.length > 0) {
//       designType = "pdf";

//       // Validate all files
//       const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
//       for (const file of pdfFile) {
//         if (!validTypes.includes(file.type)) {
//           showNotification("Only PDF, PNG, JPEG files are allowed.");
//           setIsSubmitting(false);
//           return;
//         }
//       }

//       // Build FormData
//       const formData = new FormData();
//       formData.append("user_id", userId);
//       formData.append("unique_id", uniqueId);
//       formData.append("design_type", designType);
//       formData.append("company_name", companyName.trim());
//       formData.append("position", position.trim());
//       formData.append("status", "pending");

//       pdfFile.forEach((file) => {
//         formData.append("pdf_files", file);
//       });

//       console.log("Sending MULTIPLE FILES to backend...");

//       const response = await axios.post(
//         "https://bynd-backend.onrender.com/storeurls",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const shareableLink = response.data.shareable_link;

//       const newSubmission = {
//         id: response.data.submission?.id || uniqueId,
//         pastedUrl: null,
//         companyName: companyName.trim(),
//         position: position.trim(),
//         submittedOn: new Date().toLocaleDateString("en-CA"),
//         status: "pending",
//         shareableLink,
//         uniqueId,
//         designType,
//         totalViews: 0,
//       };

//       setSubmissions((prev) => [newSubmission, ...prev]);

//       setStats((prev) => ({
//         ...prev,
//         active_submissions: prev.active_submissions + 1,
//         available_slots: Math.max(prev.available_slots - 1, 0),
//       }));

//       // Reset
//       setPdfFile([]);
//       setCompanyName("");
//       setPosition("");
//       setPastedUrl("");
//       setShowForm(false);
//       setSubmittedShareableLink(shareableLink);
//       setShowSuccessModal(true);

//       return;
//     }

//     // FIGMA LINK FLOW
//     if (pastedUrl.trim()) {
//       if (!pastedUrl.includes("figma.com")) {
//         showNotification("Please enter a valid Figma link.");
//         return;
//       }

//       designType = "figma";

//       const payload = {
//         user_id: userId,
//         unique_id: uniqueId,
//         design_type: designType,
//         original_url: pastedUrl.trim(),
//         pdf_file_path: null,
//         company_name: companyName.trim(),
//         position: position.trim(),
//         status: "pending",
//       };

//       console.log("Sending FIGMA URL payload...");

//       const response = await axios.post(
//         "https://bynd-backend.onrender.com/storeurls",
//         payload,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       const shareableLink = response.data.shareable_link;

//       const newSubmission = {
//         id: response.data.submission?.id || uniqueId,
//         pastedUrl: pastedUrl.trim(),
//         companyName: companyName.trim(),
//         position: position.trim(),
//         submittedOn: new Date().toLocaleDateString("en-CA"),
//         status: "pending",
//         shareableLink,
//         uniqueId,
//         designType,
//         totalViews: 0,
//       };

//       setSubmissions((prev) => [newSubmission, ...prev]);

//       setStats((prev) => ({
//         ...prev,
//         active_submissions: prev.active_submissions + 1,
//         available_slots: Math.max(prev.available_slots - 1, 0),
//       }));

//       // Reset
//       setCompanyName("");
//       setPosition("");
//       setPastedUrl("");
//       setPdfFile([]);
//       setShowForm(false);
//       setSubmittedShareableLink(shareableLink);
//       setShowSuccessModal(true);

//       return;
//     }

//     showNotification("Please upload files or enter a Figma link.");
//   } catch (error) {
//     console.error("Submission error:", error);

//     showNotification(
//       error.response?.data?.error ||
//         error.response?.data?.details ||
//         "Failed to submit design"
//     );

//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <div className="container">
//       {notification && (
//         <Toast message={notification} onClose={() => setNotification(null)} />
//       )}

//       <Sidebar 
//         onNewSubmission={handleShowForm}
//         onNotificationClick={() => {
//           if (isPro || isTrial) {
//             setCurrentView('notifications');
//           }
//         }}
//         onAnalyticsClick={() => {
//           if (isPro || isTrial) {
//             setCurrentView('analytics');
//           }
//         }}
//         onDashboardClick={() => setCurrentView('dashboard')}
//         currentView={currentView}
//         isPro={isPro || isTrial}
//       />

//       <div className="main-content">
//         <Header 
//           onNewSubmission={handleShowForm}
//           profile={profile}
//           showProfileDropdown={showProfileDropdown}
//           setShowProfileDropdown={setShowProfileDropdown}
//           onLogout={logout}
//           subscription={subscription}
//           onSearch={setSearchQuery}
//         />

//         {/* Show Analytics for Pro/Trial users */}
//         {currentView === 'analytics' ? (
//           (isPro || isTrial) ? (
//             <Analytics 
//               submissions={submissions}
//               loading={submissionsLoading}
//               selectedSubmission={selectedSubmissionForAnalytics}
//             />
//           ) : (
//             <div className="anl-empty-state">
//               <p>Analytics is available for Pro users only</p>
//             </div>
//           )
//         ) : currentView === 'notifications' ? (
//           <NotificationEmptyState />
//         ) : hasNoSubmissions ? (
//           <EmptyState onNewSubmission={handleShowForm} />
//         ) : (
//           <>
//             <StatsGrid stats={stats} subscription={subscription} />
            
//             {/* Only show ProBanner for Free users */}
//             {shouldShowProBanner && (
//               <ProBanner 
//                 subscription={subscription}
//                 onStartTrial={handleStartTrial}
//               />
//             )}
            
//             <SubmissionsTable 
//               submissions={submissions}
//                searchQuery={searchQuery}
//               loading={submissionsLoading}
//               onCopyLink={handleCopyLink}
//               onDelete={handleDelete}
//             />
//           </>
//         )}
//       </div>

//       <SubmissionForm
//         showForm={showForm}
//         onClose={() => setShowForm(false)}
//         pdfFile={pdfFile}
//         setPdfFile={setPdfFile}
//         pastedUrl={pastedUrl}
//         setPastedUrl={setPastedUrl}
//         companyName={companyName}
//         setCompanyName={setCompanyName}
//         position={position}
//         setPosition={setPosition}
//         onSubmit={handleStoreData}
//         isSubmitting={isSubmitting}
//       />

//       <SuccessModal 
//         show={showSuccessModal}
//         onClose={() => setShowSuccessModal(false)}
//         shareableLink={submittedShareableLink}
//         onCopyLink={handleCopyLink}
//       />
      
//       <TrailConfirmModal
//         isOpen={showTrialModal}
//         onClose={() => setShowTrialModal(false)}
//         onShowToast={showNotification} 
//       />
//     </div>
//   )}
// dashboard.jsx
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
import TrailConfirmModal from "../Trailforms/TrailConfirmModal";
import useUserPlan from "../hooks/useUserPlan";
import Notifications from "../component/Notifications/Notifications";
import Analytics from '../component/Analytics/analytics';
import './dashboard.css';

export default function Dashboard() {
  const { profile, userId, logout } = useAuth();
  const { submissions, setSubmissions, stats, setStats, loading: submissionsLoading, deleteSubmission } = useSubmissions(userId);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [pdfFile, setPdfFile] = useState([]); // always an array
  const [pastedUrl, setPastedUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedShareableLink, setSubmittedShareableLink] = useState("");
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'analytics', or 'notifications'
  const [selectedSubmissionForAnalytics, setSelectedSubmissionForAnalytics] = useState(null);

  // Subscription state
  const [subscription, setSubscription] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  const hasNoSubmissions = !submissionsLoading && submissions.length === 0;
  const [showTrialModal, setShowTrialModal] = useState(false);
  const { plan, loading, isFree, isPro, isTrial } = useUserPlan();
  
  const shouldShowProBanner = isFree;
  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!userId) {
        setLoadingSubscription(false);
        return;
      }

      try {
        setLoadingSubscription(true);
        const response = await axios.get('https://bynd-backend.onrender.com/userplan', {
          params: { user_id: userId },
          withCredentials: true
        });

        if (response.data.subscription) {
          setSubscription(response.data.subscription);
          console.log('User subscription:', response.data.subscription);
        }
      } catch (error) {
        console.error('Error fetching user plan:', error);
        showNotification('Failed to load subscription details');
      } finally {
        setLoadingSubscription(false);
      }
    };

    fetchUserPlan();
  }, [userId]);

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
    // Check subscription limits based on plan
    const isProUser = isPro || isTrial;
    const maxSubmissions = isProUser ? Infinity : 3;
    
    if (stats.active_submissions >= maxSubmissions) {
      if (!isProUser) {
        showNotification("Maximum 3 submissions allowed on free plan! Upgrade to Pro for unlimited submissions.");
      } else {
        showNotification("Maximum submissions reached!");
      }
      return;
    }

    // Pro users don't have slot limitations
    if (!isProUser && stats.available_slots <= 0) {
      showNotification("No available slots!");
      return;
    }

    setShowForm(true);
    setPdfFile([]); // <-- make sure we reset to an empty array (never null)
    setPastedUrl("");
    setCompanyName("");
    setPosition("");
  };

  const handleStartTrial = async () => {
    if (!userId) {
      showNotification('Please log in to start trial');
      return;
    }

    if (subscription?.trial_used) {
      showNotification('You have already used your free trial');
      return;
    }

    try {
      const response = await axios.post('https://bynd-backend.onrender.com/userplan/start-trial', 
        { user_id: userId },
        { withCredentials: true }
      );

      if (response.data.subscription) {
        setSubscription(prev => ({
          ...prev,
          ...response.data.subscription
        }));
        showNotification('14-day Pro trial started successfully! 🎉');
      }
    } catch (error) {
      console.error('Error starting trial:', error);
      showNotification(error.response?.data?.error || 'Failed to start trial');
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

  // handleStoreData (keeps your multi-file flow)
  const handleStoreData = async () => {
    try {
      setIsSubmitting(true);

      if (!userId) {
        showNotification("Please log in to submit designs");
        setIsSubmitting(false);
        return;
      }

      const uniqueId = nanoid(10);
      let designType;

      // MULTIPLE FILE UPLOAD FLOW
      if (Array.isArray(pdfFile) && pdfFile.length > 0) {
        designType = "pdf";

        // Validate all files
        const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
        for (const file of pdfFile) {
          if (!validTypes.includes(file.type)) {
            showNotification("Only PDF, PNG, JPEG files are allowed.");
            setIsSubmitting(false);
            return;
          }
        }

        // Build FormData
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("unique_id", uniqueId);
        formData.append("design_type", designType);
        formData.append("company_name", companyName.trim());
        formData.append("position", position.trim());
        formData.append("status", "pending");

        pdfFile.forEach((file) => {
          formData.append("pdf_files", file);
        });
// https://bynd-backend.onrender.com
        const response = await axios.post(
          "https://bynd-backend.onrender.com/storeurls",
          formData,
          {
            withCredentials: true
          
          }
        );

        const shareableLink = response.data.shareable_link;

        const newSubmission = {
          id: response.data.submission?.id || uniqueId,
          pastedUrl: null,
          companyName: companyName.trim(),
          position: position.trim(),
          submittedOn: new Date().toLocaleDateString("en-CA"),
          status: "pending",
          shareableLink,
          uniqueId,
          designType,
          totalViews: 0,
        };

        setSubmissions((prev) => [newSubmission, ...prev]);

        setStats((prev) => ({
          ...prev,
          active_submissions: (prev?.active_submissions || 0) + 1,
          available_slots: Math.max((prev?.available_slots || 0) - 1, 0),
        }));

        // Reset
        setPdfFile([]);
        setCompanyName("");
        setPosition("");
        setPastedUrl("");
        setShowForm(false);
        setSubmittedShareableLink(shareableLink);
        setShowSuccessModal(true);

        return;
      }

      // FIGMA LINK
      if (pastedUrl.trim()) {
        if (!pastedUrl.includes("figma.com")) {
          showNotification("Please enter a valid Figma link.");
          setIsSubmitting(false);
          return;
        }

        designType = "figma";

        const payload = {
          user_id: userId,
          unique_id: uniqueId,
          design_type: designType,
          original_url: pastedUrl.trim(),
          pdf_file_path: null,
          company_name: companyName.trim(),
          position: position.trim(),
          status: "pending",
        };

        const response = await axios.post(
          "https://bynd-backend.onrender.com/storeurls",
          payload,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        const shareableLink = response.data.shareable_link;

        const newSubmission = {
          id: response.data.submission?.id || uniqueId,
          pastedUrl: pastedUrl.trim(),
          companyName: companyName.trim(),
          position: position.trim(),
          submittedOn: new Date().toLocaleDateString("en-CA"),
          status: "pending",
          shareableLink,
          uniqueId,
          designType,
          totalViews: 0,
        };

        setSubmissions((prev) => [newSubmission, ...prev]);

        setStats((prev) => ({
          ...prev,
          active_submissions: (prev?.active_submissions || 0) + 1,
          available_slots: Math.max((prev?.available_slots || 0) - 1, 0),
        }));

        // Reset
        setCompanyName("");
        setPosition("");
        setPastedUrl("");
        setPdfFile([]);
        setShowForm(false);
        setSubmittedShareableLink(shareableLink);
        setShowSuccessModal(true);

        return;
      }

      showNotification("Please upload files or enter a Figma link.");
    } catch (error) {
      console.error("Submission error:", error);

      showNotification(
        error.response?.data?.error ||
          error.response?.data?.details ||
          "Failed to submit design"
      );

      // Reset on error (always array)
      setPdfFile([]);
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

      <Sidebar 
        onNewSubmission={handleShowForm}
        onNotificationClick={() => {
          if (isPro || isTrial) {
            setCurrentView('notifications');
          }
        }}
        onAnalyticsClick={() => {
          if (isPro || isTrial) {
            setCurrentView('analytics');
          }
        }}
        onDashboardClick={() => setCurrentView('dashboard')}
        currentView={currentView}
        isPro={isPro || isTrial}
      />

      <div className="main-content">
        <Header 
          onNewSubmission={handleShowForm}
          profile={profile}
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          onLogout={logout}
          subscription={subscription}
          onSearch={setSearchQuery}
        />

        {/* Show Analytics for Pro/Trial users */}
        {currentView === 'analytics' ? (
          (isPro || isTrial) ? (
            <Analytics 
              submissions={submissions}
              loading={submissionsLoading}
              selectedSubmission={selectedSubmissionForAnalytics}
            />
          ) : (
            <div className="anl-empty-state">
              <p>Analytics is available for Pro users only</p>
            </div>
          )
        ) : currentView === "notifications" ? (
  <Notifications userId={userId} />
)
 : hasNoSubmissions ? (
          <EmptyState onNewSubmission={handleShowForm} />
        ) : (
          <>
            <StatsGrid stats={stats} subscription={subscription} />
          
            {shouldShowProBanner && (
              <ProBanner 
                subscription={subscription}
                onStartTrial={handleStartTrial}
              />
            )}
            
            <SubmissionsTable 
              submissions={submissions}
              searchQuery={searchQuery}
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
      
      <TrailConfirmModal
        isOpen={showTrialModal}
        onClose={() => setShowTrialModal(false)}
        onShowToast={showNotification} 
      />
    </div>
  );
}

