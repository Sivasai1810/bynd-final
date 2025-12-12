import React, { useState, useRef } from 'react';

// Mobile Card Component
const MobileSubmissionCard = ({ submission, index, onCopyLink, onDelete, onEmployerView }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    <div style={{
      background: '#ffffff',
      border: '1px solid #E5E7EB',
      borderRadius: '14px',
      padding: '16px 22px 22px 22px',
      position: 'relative',
      marginBottom: '18px'
    }}>
      {/* Three dots - Top Right */}
      <button
        onClick={handleMenuToggle}
        disabled={isDeleting}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
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
        <div style={{
          position: 'absolute',
          top: '52px',
          right: '16px',
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
                padding: '2px 4px'
              }}
            >
              ✕
            </button>
          </div>

          <button
            onClick={handleDeleteClick}
            style={{
              padding: '10px 14px',
              background: 'white',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#EF4444'
            }}
          >
            Delete Submission
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

// Demo Component
export default function App() {
  const [submissions] = useState([
    {
      uniqueId: '1',
      companyName: 'Tech Corp',
      position: 'Product Design Intern',
      submittedOn: '26/11/2024',
      status: 'pending',
      shareableLink: 'https://bynd.in/view/abc123'
    },
    {
      uniqueId: '2',
      companyName: 'Design Studio',
      position: 'UI/UX Designer',
      submittedOn: '25/11/2024',
      status: 'viewed',
      shareableLink: 'https://bynd.in/view/xyz789'
    }
  ]);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copied!');
  };

  const handleDelete = (id) => {
    console.log('Delete:', id);
    return Promise.resolve(true);
  };

  const handleEmployerView = (id) => {
    console.log('View employer:', id);
  };

  return (
    <div style={{ padding: '16px', background: '#f9fafb', minHeight: '100vh' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '16px', marginLeft: '16px' }}>
        Design Submissions
      </h2>
      
      {submissions.map((submission, index) => (
        <MobileSubmissionCard
          key={submission.uniqueId}
          submission={submission}
          index={index}
          onCopyLink={handleCopyLink}
          onDelete={handleDelete}
          onEmployerView={handleEmployerView}
        />
      ))}
    </div>
  );
}