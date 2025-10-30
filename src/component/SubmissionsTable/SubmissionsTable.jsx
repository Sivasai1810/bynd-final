import React from 'react';
import SubmissionRow from './SubmissionsRow';

export default function SubmissionsTable({ 
  submissions, 
  loading, 
  onCopyLink,
  onDelete 
}) {
  return (
    <>
      <h2 className="table-title">Design Submissions</h2>
      <div className="table-container">
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
              <tr>
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
                />
              ))
            ) : (
              <tr>
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
    </>
  );
}