// import React from 'react';
// import SubmissionRow from './SubmissionsRow';
// import { useNavigate } from "react-router-dom";

// export default function SubmissionsTable({ 
//   submissions, 
//   loading, 
//   onCopyLink,
//   onDelete 
// }) {

//   const navigate = useNavigate();

//   // ⭐ This is Step 2 — Employer View Handler
//   const handleEmployerView = (uniqueId) => {
//     navigate(`/designpreview/${uniqueId}`);
//   };

//   return (
//     <>
//       <h2 className="table-title">Design Submissions</h2>
//       <div className="table-container">
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
//               <tr>
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

//                   // ⭐ Pass new handler here
//                   onEmployerView={handleEmployerView}
//                 />
//               ))
//             ) : (
//               <tr>
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
//     </>
//   );
// }

import React from 'react';
import SubmissionRow from './SubmissionsRow';
import { useNavigate } from "react-router-dom";

export default function SubmissionsTable({ 
  searchQuery,
  submissions, 
  loading, 
  onCopyLink,
  onDelete 
}) {

  const navigate = useNavigate();

  const handleEmployerView = (uniqueId) => {
    navigate(`/designpreview/${uniqueId}`);
  };

  return (
    <>
      <h2 className="table-title">Design Submissions</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="mobile-table-card">
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
              // mark this row with a class so mobile CSS can ignore ::before injection
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
              // no-data row also gets a class so mobile CSS won't add a label
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
    </>
  );
}
