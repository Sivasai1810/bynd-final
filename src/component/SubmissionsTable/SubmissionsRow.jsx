import React, { useState, useRef, useEffect } from 'react';
import './SubmisisonsTable.css'
export default function SubmissionRow({ submission, index, onCopyLink, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(submission.id);
      setShowMenu(false);
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
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
      {/* <td>{submission.totalViews || 0}</td> */}
      <td>
        <button 
          className="action-btn"
          onClick={() => onCopyLink(submission.shareableLink)}
        >
          Copy BYND Link
        </button>
        <div className="more-btn-container" ref={menuRef}>
          <button 
            className="more-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋮
          </button>
          {showMenu && (
            <div className="dropdown-menu">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="dropdown-item delete-item"
              >
                <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}