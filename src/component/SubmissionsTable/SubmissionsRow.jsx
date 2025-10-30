// import React, { useState, useRef, useEffect } from 'react';
// import './SubmisisonsTable.css';

// export default function SubmissionRow({ submission, index, onCopyLink, onDelete }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowMenu(false);
//       }
//     }

//     if (showMenu) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showMenu]);

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete this submission?')) {
//       return;
//     }

//     setIsDeleting(true);
//     try {
//       const success = await onDelete(submission.id);
//       if (success) {
//         setShowMenu(false);
//         // No need to manually update UI - the parent will handle it via hook
//       }
//     } catch (error) {
//       console.error('Error deleting:', error);
//       alert('Failed to delete submission. Please try again.');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <tr>
//       <td>{index + 1}</td>
//       <td>{submission.companyName}</td>
//       <td>{submission.position}</td>
//       <td>{submission.submittedOn}</td>
//       <td>
//         <span className={`status-badge status-${submission.status}`}>
//           {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
//         </span>
//       </td>
//       <td>
//         <button 
//           className="action-btn"
//           onClick={() => onCopyLink(submission.shareableLink)}
//         >
//           Copy BYND Link
//         </button>
//         <div className="more-btn-container" ref={menuRef}>
//           <button 
//             className="more-btn"
//             onClick={() => setShowMenu(!showMenu)}
//             disabled={isDeleting}
//           >
//             ⋮
//           </button>
//           {showMenu && (
//             <div className="dropdown-menu">
//               <button
//                 onClick={handleDelete}
//                 disabled={isDeleting}
//                 className="dropdown-item delete-item"
//               >
//                 <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//                 {isDeleting ? 'Deleting...' : 'Delete'}
//               </button>
//             </div>
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// }
import React, { useState, useRef, useEffect } from 'react';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import './SubmisisonsTable.css';

const CopyButtonWithTooltip = ({ onCopyLink, shareableLink }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);

  return (
    <div className="copy-button-wrapper">
      <button 
        ref={buttonRef}
        className="action-btn copy-btn"
        onClick={() => onCopyLink(shareableLink)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
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
      
      {showTooltip && (
        <div className="copy-tooltip">
          <div className="copy-tooltip-content">
           <span>Share only this link with recruiters</span><br></br> it's the only one that will provide assignment status, insights, metrics and detailed analytics.
          </div>
        </div>
      )}
    </div>
  );
};

export default function SubmissionRow({ submission, index, onCopyLink, onDelete, onEmployerView }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleDeleteClick = () => {
    setShowMenu(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await onDelete(submission.uniqueId);
      if (success) {
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete submission. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEmployerView = () => {
    onEmployerView?.(submission.id);
    setShowMenu(false);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{submission.companyName}</td>
        <td>{submission.position}</td>
        <td>{submission.submittedOn}</td>
        <td>
          <span className={`status-badge status-${submission.status}`}>
            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
          </span>
        </td>
        <td>
          <div className="actions-container">
            <CopyButtonWithTooltip 
              onCopyLink={onCopyLink}
              shareableLink={submission.shareableLink}
            />
            
            <div className="more-btn-container" ref={menuRef}>
              <button 
                className="more-btn"
                onClick={() => setShowMenu(!showMenu)}
                disabled={isDeleting}
              >
                ⋮
              </button>
              {showMenu && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <span className="dropdown-title">Actions</span>
                    <button 
                      className="dropdown-close"
                      onClick={() => setShowMenu(false)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={handleDeleteClick}
                    className="dropdown-item delete-item"
                  >
                    <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="dropdown-texts">Delete Submission</span>
                  </button>

                  <button
                    onClick={handleEmployerView}
                    className="dropdown-item view-item"
                  >
                    <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="dropdown-text">Employer's view</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        submissionData={submission}
        isDeleting={isDeleting}
      />
    </>
  );
}