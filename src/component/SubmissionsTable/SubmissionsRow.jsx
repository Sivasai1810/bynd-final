import React, { useState } from "react";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import "./SubmisisonsTable.css";


const CopyButtonWithTooltip = ({ shareableLink, onCopy }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      onCopy(); 
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="copy-button-wrapper">
      <button
        className="action-btn copy-btn"
        onClick={handleCopy}
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
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Copy BYND Link
      </button>

      {showTooltip && (
        <div className="copy-tooltip">
          <div className="copy-tooltip-content">
            <h3>Share only this link with recruiters</h3>
            It provides assignment status, insights, metrics, and analytics.
          </div>
        </div>
      )}
    </div>
  );
};


export default function SubmissionRow({
  submission,
  index,
  onDelete,
  onEmployerView,
  onCopyLinkTrigger,
  searchQuery,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isHighlighted =
    searchQuery &&
    submission.companyName.toLowerCase().includes(searchQuery.toLowerCase());

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await onDelete(submission.uniqueId);
      if (success) setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };
     const statusLabel =
  submission.status
    ? submission.status.charAt(0).toUpperCase() + submission.status.slice(1)
    : "Pending";
  return (
    <>
      <tr className={`mobile-table-card ${isHighlighted ? "highlight-row" : ""}`}>
        <td>
          <span className="cell-value">{index + 1}</span>
        </td>

        <td>
          <span className="cell-value">{submission.companyName}</span>
        </td>

        <td>
          <span className="cell-value">{submission.position}</span>
        </td>

        <td>
          <span className="cell-value">{submission.submittedOn}</span>
        </td>

        <td>
          <span className={`status-badge status-${submission.status}`}>
<span className={`status-badge status-${submission.status || "pending"}`}>
  {statusLabel}
</span>

          </span>
        </td>

        <td>
          <div className="actions-container">
            {/* COPY BUTTON */}
          <CopyButtonWithTooltip
  shareableLink={submission.shareableLink}
  onCopy={() => onCopyLinkTrigger(submission.shareableLink)}
/>


            {/* DOT MENU */}
            <button
              className="more-btn desktop-dots"
              onClick={() => setShowMenu((p) => !p)}
              disabled={isDeleting}
            >
              ⋮
            </button>

            <button
              className="more-btn mobile-dots-btn"
              onClick={() => setShowMenu((p) => !p)}
              disabled={isDeleting}
            >
              ⋮
            </button>
          </div>

          {/* DROPDOWN */}
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
                className="dropdown-item delete-item"
                onClick={() => {
                  setShowMenu(false);
                  setShowDeleteModal(true);
                }}
              >
                Delete Submission
              </button>

              <button
                className="dropdown-item view-item"
                onClick={() => {
                  const id = submission.shareableLink.split("/").pop();
                  onEmployerView(id);
                  setShowMenu(false);
                }}
              >
                Employer&apos;s view
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
