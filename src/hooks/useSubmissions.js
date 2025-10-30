// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export function useSubmissions(userId) {
//   const navigate = useNavigate();
//   const [submissions, setSubmissions] = useState([]);
//   const [stats, setStats] = useState({
//     active_submissions: 0,
//     available_slots: 3,
//     total_assignments_viewed: 0,
//     last_viewed_assignment: null
//   });
//   const [loading, setLoading] = useState(false);

//   const fetchSubmissions = useCallback(async () => {
//     if (!userId) return;
    
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:3000/userurls", { 
//         params: { user_id: userId },
//         withCredentials: true 
//       });
      
//       if (res.data.success && res.data.submissions) {
//         const formattedSubmissions = res.data.submissions.map((submission) => ({
//           id: submission.id,
//           pastedUrl: submission.original_url,
//           companyName: submission.company_name,
//           position: submission.position,
//           submittedOn: submission.created_at 
//             ? new Date(submission.created_at).toLocaleDateString('en-CA') 
//             : 'N/A',
//           status: submission.status,
//           shareableLink: submission.shareable_link,
//           uniqueId: submission.unique_id,
//           embedUrl: submission.embed_url,
//           designType: submission.design_type,
//           pdfFilePath: submission.pdf_file_path,
//           totalViews: submission.total_views || 0,
//           lastViewedAt: submission.last_viewed_at
//         }));
        
//         setSubmissions(formattedSubmissions);
        
//         if (res.data.stats) {
//           setStats(res.data.stats);
//         }
//       } else {
//         setSubmissions([]);
//         setStats({
//           active_submissions: 0,
//           available_slots: 3,
//           total_assignments_viewed: 0,
//           last_viewed_assignment: null
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
      
//       setSubmissions([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, navigate]);

//   // Fetch submissions only on mount (when user signs in)
//   useEffect(() => {
//     fetchSubmissions();
//   }, [fetchSubmissions]);

// const deleteSubmission = async (uniqueId) => {
//   try {
//     console.log('Deleting submission with uniqueId:', uniqueId);
    
//     const res = await axios.delete(
//       `http://localhost:3000/submissions/delete/${uniqueId}`, 
//       {
//         withCredentials: true
//       }
//     );

//     if (res.data.success) {
//       // Remove from local state using uniqueId
//       setSubmissions(prev => prev.filter(s => s.uniqueId !== uniqueId));
//       setStats(prev => ({
//         ...prev,
//         active_submissions: Math.max(prev.active_submissions - 1, 0),
//         available_slots: Math.min(prev.available_slots + 1, 3)
//       }));
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error('Error deleting submission:', error);
//     throw error;
//   }
// };

//   // Expose refetch function for manual calls (e.g., after successful submission)
//   const refetchSubmissions = useCallback(() => {
//     return fetchSubmissions();
//   }, [fetchSubmissions]);

//   return { 
//     submissions, 
//     setSubmissions, 
//     stats, 
//     setStats, 
//     loading, 
//     deleteSubmission,
//     refetchSubmissions // Export this to call after successful design submission
//   };
// }
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useSubmissions(userId) {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({
    active_submissions: 0,
    available_slots: 3,
    total_assignments_viewed: 0,
    last_viewed_assignment: null
  });
  const [loading, setLoading] = useState(false);
  const pollingIntervalRef = useRef(null);

  const fetchSubmissions = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const res = await axios.get("https://bynd-backend.onrender.com/userurls", { 
        params: { user_id: userId },
        withCredentials: true 
      });
      
      if (res.data.success && res.data.submissions) {
        const formattedSubmissions = res.data.submissions.map((submission) => ({
          id: submission.id,
          pastedUrl: submission.original_url,
          companyName: submission.company_name,
          position: submission.position,
          submittedOn: submission.created_at 
            ? new Date(submission.created_at).toLocaleDateString('en-CA') 
            : 'N/A',
          status: submission.status,
          shareableLink: submission.shareable_link,
          uniqueId: submission.unique_id,
          embedUrl: submission.embed_url,
          designType: submission.design_type,
          pdfFilePath: submission.pdf_file_path,
          totalViews: submission.total_views || 0,
          lastViewedAt: submission.last_viewed_at
        }));
        
        setSubmissions(formattedSubmissions);
        
        if (res.data.stats) {
          setStats(res.data.stats);
        }
      } else {
        setSubmissions([]);
        setStats({
          active_submissions: 0,
          available_slots: 3,
          total_assignments_viewed: 0,
          last_viewed_assignment: null
        });
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, [userId, navigate]);

  // Initial fetch on mount
  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Conditional Polling: Only poll when submissions.length > 0
  useEffect(() => {
    if (!userId) return;

    // Clear any existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    // Only start polling if there are submissions
    if (submissions.length > 0) {
      pollingIntervalRef.current = setInterval(() => {
        fetchSubmissions();
      }, 100000); // 10 seconds
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [userId, submissions.length, fetchSubmissions]);

  const deleteSubmission = async (uniqueId) => {
    try {
      console.log('Deleting submission with uniqueId:', uniqueId);
      
      const res = await axios.delete(
        `https://bynd-backend.onrender.com/submissions/delete/${uniqueId}`, 
        {
          withCredentials: true
        }
      );

      if (res.data.success) {
        // Remove from local state using uniqueId
        setSubmissions(prev => prev.filter(s => s.uniqueId !== uniqueId));
        setStats(prev => ({
          ...prev,
          active_submissions: Math.max(prev.active_submissions - 1, 0),
          available_slots: Math.min(prev.available_slots + 1, 3)
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting submission:', error);
      throw error;
    }
  };

  // Expose refetch function for manual calls
  const refetchSubmissions = useCallback(() => {
    return fetchSubmissions();
  }, [fetchSubmissions]);

  // Function to call when user copies BYND link
  const onCopyLinkTrigger = useCallback(() => {
    // Immediately refetch to get latest data
    fetchSubmissions();
  }, [fetchSubmissions]);

  return { 
    submissions, 
    setSubmissions, 
    stats, 
    setStats, 
    loading, 
    deleteSubmission,
    refetchSubmissions,
    onCopyLinkTrigger // Export this to call when user copies BYND link
  };
}