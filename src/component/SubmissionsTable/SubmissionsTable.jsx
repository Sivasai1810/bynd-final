// import React, { useEffect, useState } from 'react';
// import SubmissionRow from './SubmissionsRow';
// import Mobileview from "./mobileview"
// import { useNavigate } from "react-router-dom";

// export default function SubmissionsTable({ 
//   searchQuery,
//   submissions, 
//   loading, 
//   onCopyLink,
//   onDelete 
// }) {
// const [isMobile,setIsmobile]=useState(window.innerWidth<=767);
// useEffect(()=>{
//   const handleResize=()=>setIsmobile(window.innerWidth<=767)
//   window.addEventListener('resize',handleResize);
//   return ()=>window.removeEventListener('resizze',handleResize);
// },[])
//   const navigate = useNavigate();

//   const handleEmployerView = (uniqueId) => {
//     navigate(`/designpreview/${uniqueId}`);
//   };

//   return (
//     <>
//       <h2 className="table-title">Design Submissions</h2>
//       <div className="table-container">
//          <div className="table-wrapper">
//         <table className="table">
//           <thead>
//             <tr className="mobile-table-card">
//               <th>S.No.</th>
//               <th>Company name</th>
//               <th>Position</th>
//               <th>Submitted on</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               // mark this row with a class so mobile CSS can ignore ::before injection
//               <tr className="loading-row">
//                 <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
//                     <div className="spinner"></div>
//                     LOADING...
//                   </div>
//                 </td>
//               </tr>
//             ) : submissions.length > 0 ? (
//               submissions.map((submission, index) => (
//                 <SubmissionRow
//                   key={submission.id}
//                   submission={submission}
//                   index={index}
//                   onCopyLink={onCopyLink}
//                   onDelete={onDelete}
//                   onEmployerView={handleEmployerView}
//                   searchQuery={searchQuery}
//                 />
//               ))
//             ) : (
//               // no-data row also gets a class so mobile CSS won't add a label
//               <tr className="no-data-row">
//                 <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
//                   <div style={{ color: '#666' }}>
//                     NO DATA FOUND
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import SubmissionRow from './SubmissionsRow';
import { useNavigate } from "react-router-dom";

// Mobile Card Component
const MobileSubmissionCard = ({ submission, index, onCopyLink, onDelete, onEmployerView, searchQuery }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(prev => !prev);
  };

  const handleDeleteClick = async () => {
    setShowMenu(false);
    setIsDeleting(true);
    try {
      await onDelete(submission.uniqueId);
    } finally {
      setIsDeleting(false);
    }
  };

  const isHighlighted = searchQuery && submission.companyName.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div style={{
      background: isHighlighted ? '#fff7d6' : '#ffffff',
      border: '1px solid #E5E7EB',
      borderRadius: '14px',
      padding: '56px 22px 22px 22px',
      position: 'relative',
      marginBottom: '18px',
      transition: 'all 0.2s ease'
    }}>
      {/* Three dots - Top Right */}
      <button
        onClick={handleMenuToggle}
        disabled={isDeleting}
        style={{
          position: 'absolute',
          top: '16px',
          right: '9px',
          width: '32px',
          height: '32px',
          background: 'transparent',
          border: 'none',
          fontSize: '20px',
          color: '#6B7280',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0
        }}
      >
        ⋮
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div 
            onClick={() => setShowMenu(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
          />
          
          <div style={{
            position: 'absolute',
            top: '52px',
            right: '22px',
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            minWidth: '200px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>Actions</span>
              <button
                onClick={() => setShowMenu(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '16px',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '4px'
                }}
              >
                ✕
              </button>
            </div>

            <button
              onClick={handleDeleteClick}
              disabled={isDeleting}
              style={{
                padding: '10px 14px',
                background: 'white',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                color: '#EF4444',
                opacity: isDeleting ? 0.5 : 1
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete Submission'}
            </button>

            <button
              onClick={() => {
                const id = submission.shareableLink.split("/").pop();
                onEmployerView(id);
                setShowMenu(false);
              }}
              style={{
                padding: '10px 14px',
                background: 'white',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#1A1A1A'
              }}
            >
              Employer's view
            </button>
          </div>
        </>
      )}

      {/* Card Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* S.No */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>S.No.</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{index + 1}</span>
        </div>

        {/* Company name */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>Company name</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', textAlign: 'right' }}>
            {submission.companyName}
          </span>
        </div>

        {/* Position */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>Position</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827', textAlign: 'right' }}>
            {submission.position}
          </span>
        </div>

        {/* Submitted on */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>Submitted on</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
            {submission.submittedOn}
          </span>
        </div>

        {/* Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>Status</span>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 500,
            background: submission.status === 'viewed' ? '#F0FBF2' : 
                       submission.status === 'pending' ? '#FFF7E6' : 
                       submission.status === 'approved' ? '#f0fdf4' : '#fef2f2',
            color: submission.status === 'viewed' ? '#1DB153' : 
                   submission.status === 'pending' ? '#D97706' : 
                   submission.status === 'approved' ? '#16a34a' : '#dc2626'
          }}>
            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ color: '#6B7280', fontSize: '13px', fontWeight: 500 }}>Actions</span>
          <button 
            onClick={() => onCopyLink(submission.shareableLink)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '10px',
              background: '#F3F4F6',
              border: '1px solid #E5E7EB',
              fontSize: '14px',
              color: '#111827',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy BYND Link
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Table Component
export default function SubmissionsTable({ 
  searchQuery,
  submissions, 
  loading, 
  onCopyLink,
  onDelete 
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();

  const handleEmployerView = (uniqueId) => {
    navigate(`/designpreview/${uniqueId}`);
  };

  return (
    <>
      <h2 className="table-title">Design Submissions</h2>
      <div className="table-container">
        {/* DESKTOP VIEW */}
        {!isMobile ? (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Company name</th>
                  <th>Position</th>
                  <th>Submitted on</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr className="loading-row">
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <div className="spinner"></div>
                        LOADING...
                      </div>
                    </td>
                  </tr>
                ) : submissions.length > 0 ? (
                  submissions.map((submission, index) => (
                    <SubmissionRow
                      key={submission.id}
                      submission={submission}
                      index={index}
                      onCopyLink={onCopyLink}
                      onDelete={onDelete}
                      onEmployerView={handleEmployerView}
                      searchQuery={searchQuery}
                    />
                  ))
                ) : (
                  <tr className="no-data-row">
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{ color: '#666' }}>
                        NO DATA FOUND
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* MOBILE VIEW */
          <div style={{ padding: '0' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <div className="spinner"></div>
                  LOADING...
                </div>
              </div>
            ) : submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <MobileSubmissionCard
                  key={submission.id}
                  submission={submission}
                  index={index}
                  onCopyLink={onCopyLink}
                  onDelete={onDelete}
                  onEmployerView={handleEmployerView}
                  searchQuery={searchQuery}
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                NO DATA FOUND
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}