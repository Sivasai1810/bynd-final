// import React, { useState, useRef, useEffect } from 'react';
// import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
// import './SubmisisonsTable.css';

// const CopyButtonWithTooltip = ({ onCopyLink, shareableLink }) => {
//   const [showTooltip, setShowTooltip] = useState(false);
//   const buttonRef = useRef(null);

//   return (
//     <div className="copy-button-wrapper">
//       <button 
//         ref={buttonRef}
//         className="action-btn copy-btn"
//         onClick={() => onCopyLink(shareableLink)}
//         onMouseEnter={() => setShowTooltip(true)}
//         onMouseLeave={() => setShowTooltip(false)}
//       >
//         <svg 
//           width="16" 
//           height="16" 
//           viewBox="0 0 24 24" 
//           fill="none" 
//           stroke="currentColor" 
//           strokeWidth="2"
//         >
//           <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//         </svg>
//         Copy BYND Link
//       </button>

//       {showTooltip && (
//         <div className="copy-tooltip">
//           <div className="copy-tooltip-content">
//             <span><h3>Share only this link with recruiters</h3></span>
//             it's the only one that will provide assignment status, insights, metrics and detailed analytics.
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function SubmissionRow({ submission, index, onCopyLink, onDelete, onEmployerView }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [flipUp, setFlipUp] = useState(false);
//   const menuRef = useRef(null);
//   const buttonRef = useRef(null);
//   const dropdownRef = useRef(null);

//   const handleMenuToggle = () => {
//     setShowMenu(!showMenu);
//   };

//   const handleDeleteClick = () => {
//     setShowMenu(false);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     setIsDeleting(true);
//     try {
//       const success = await onDelete(submission.uniqueId);
//       if (success) {
//         setShowDeleteModal(false);
//       }
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <>
//       {/* Desktop = normal row, Mobile = styled card via CSS */}
//       <tr className="mobile-table-card">
//         <td>
//           <span className="cell-value">{index + 1}</span>
//         </td>
//         <td>
//           <span className="cell-value">{submission.companyName}</span>
//         </td>
//         <td>
//           <span className="cell-value">{submission.position}</span>
//         </td>
//         <td>
//           <span className="cell-value">{submission.submittedOn}</span>
//         </td>
//         <td>
//           <span className={`status-badge status-${submission.status}`}>
//             {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
//           </span>
//         </td>

//         <td>
//           <div className="actions-container">
//             <CopyButtonWithTooltip 
//               onCopyLink={onCopyLink}
//               shareableLink={submission.shareableLink}
//             />

           
//             <div className="more-btn-container" ref={menuRef}>
//               <button 
//                 ref={buttonRef}
//                 className="more-btn"
//                 onClick={handleMenuToggle}
//                 disabled={isDeleting}
//               >
//                 ⋮
//               </button>

//               {showMenu && (
//                 <div 
//                   ref={dropdownRef}
//                   className="dropdown-menu"
//                   style={flipUp ? { 
//                     top: 'auto', 
//                     bottom: 'calc(100% + 6px)' 
//                   } : {}}
//                 >
//                  <div className="dropdown-header">
//   <span className="dropdown-title">Actions</span>

 
//   <button
//     className="dropdown-xclose"
//     onClick={() => setShowMenu(false)}
//   >
//     ✕
//   </button>
// </div>

//                   <button
//                     onClick={handleDeleteClick}
//                     className="dropdown-item delete-item"
//                   >
//                     Delete Submission
//                   </button>
//                   <button
//   onClick={() => {
//     const full = submission.shareableLink; 
//     // Example: https://bynd.in/view/4Zvf5Id0Dn
//     const uniqueId = full.split("/").pop(); 
//     onEmployerView(uniqueId);
//     setShowMenu(false);
//   }}
//   className="dropdown-item view-item"
// >
//   Employer's view
// </button>

//                 </div>
//               )}
//             </div>
//           </div>
//         </td>
//       </tr>

//       <DeleteConfirmationModal
//         show={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         onConfirm={handleConfirmDelete}
//         submissionData={submission}
//         isDeleting={isDeleting}
//       />
//     </>
//   );
// }

import React, { useState, useRef } from 'react';
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
            <span><h3>Share only this link with recruiters</h3></span>
            it's the only one that will provide assignment status, insights, metrics and detailed analytics.
          </div>
        </div>
      )}
    </div>
  );
};

export default function SubmissionRow({ submission, index, onCopyLink, onDelete, onEmployerView , searchQuery}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flipUp, setFlipUp] = useState(false);

  // separate refs for desktop and mobile buttons (no ref reuse)
  const desktopBtnRef = useRef(null);
  const mobileBtnRef = useRef(null);
  const dropdownRef = useRef(null);
const isHighlighted = 
  searchQuery &&
  submission.companyName.toLowerCase().includes(searchQuery.toLowerCase());

  const handleMenuToggle = () => {
    setShowMenu(prev => !prev);
  };

  const handleDeleteClick = () => {
    setShowMenu(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await onDelete(submission.uniqueId);
      if (success) setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };


    return (
  <>
 <tr className={`mobile-table-card ${isHighlighted ? "highlight-row" : ""}`}>

    
      <td><span className="cell-value">{index + 1}</span></td>

      <td><span className="cell-value">{submission.companyName}</span></td>

      <td><span className="cell-value">{submission.position}</span></td>

      <td><span className="cell-value">{submission.submittedOn}</span></td>

      <td>
        <span className={`status-badge status-${submission.status}`}>
          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
        </span>
      </td>
      <td>
        <div className="actions-container">

          {/* COPY BUTTON */}
          <CopyButtonWithTooltip 
            onCopyLink={onCopyLink}
            shareableLink={submission.shareableLink}
          />

          {/* DESKTOP DOTS */}
          <button
            className="more-btn desktop-dots"
            onClick={handleMenuToggle}
            disabled={isDeleting}
          >
            ⋮
          </button>
          <button
            className="more-btn mobile-dots-btn"
            onClick={handleMenuToggle}
            disabled={isDeleting}
          >
            ⋮
          </button>

        </div>

        {/* SHARED DROPDOWN */}
        {showMenu && (
          <div className="dropdown-menu">
            <div className="dropdown-header">
              <span className="dropdown-title">Actions</span>
              <button
                className="dropdown-xclose"
                onClick={() => setShowMenu(false)}
              >
                ✕
              </button>
            </div>

            <button
              onClick={() => {
                setShowMenu(false);
                handleDeleteClick();
              }}
              className="dropdown-item delete-item"
            >
              Delete Submission
            </button>

            <button
              onClick={() => {
                const id = submission.shareableLink.split("/").pop();
                onEmployerView(id);
                setShowMenu(false);
              }}
              className="dropdown-item view-item"
            >
              Employer's view
            </button>
          </div>
        )}

      </td>
    </tr>

    <DeleteConfirmationModal
      show={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={handleConfirmDelete}
      submissionData={submission}
      isDeleting={isDeleting}
    />
  </>
);
}