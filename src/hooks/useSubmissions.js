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
      // https://bynd-backend.onrender.com
      const res = await axios.get("https://bynd-backend.onrender.com/userurls", { 
        params: { user_id: userId },
        withCredentials: true 
      });
      
      console.log(' API Response:', res.data);
      
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
          lastViewedAt: submission.last_viewed_at 
        }));
        
        setSubmissions(formattedSubmissions);
        
        if (res.data.stats) {
          console.log(' Stats received:', res.data.stats);
          console.log(' Last viewed assignment:', res.data.stats.last_viewed_assignment);
          setStats(res.data.stats);
        } else {
          console.warn(' No stats in response');
        }
      } else {
        console.log('No submissions found');
        setSubmissions([]);
        setStats({
          active_submissions: 0,
          available_slots: 3,
          total_assignments_viewed: 0,
          last_viewed_assignment: null
        });
      }
    } catch (error) {
      console.error(' Error fetching submissions:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, [userId, navigate]);


  useEffect(() => {
    console.log(' Initial fetch triggered for userId:', userId);
    fetchSubmissions();
  }, [fetchSubmissions]);


  useEffect(() => {
    if (!userId) return;

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

   
    if (submissions.length > 0) {
      console.log(' Starting polling (every 40 seconds)...');
      pollingIntervalRef.current = setInterval(() => {
        console.log(' Polling: Fetching submissions...');
        fetchSubmissions();
      }, 40000); 
    } else {
      console.log(' Polling stopped (no submissions)');
    }

 
    return () => {
      if (pollingIntervalRef.current) {
        console.log(' Polling stopped');
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [userId, submissions.length, fetchSubmissions]);

  const deleteSubmission = async (uniqueId) => {
    try {
      console.log(' Deleting submission with uniqueId:', uniqueId);
      
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
        console.log('Submission deleted successfully');
        return true;
      }
      return false;
    } catch (error) {
      console.error(' Error deleting submission:', error);
      throw error;
    }
  };

  // Expose refetch function for manual calls
  const refetchSubmissions = useCallback(() => {
    console.log(' Manual refetch triggered');
    return fetchSubmissions();
  }, [fetchSubmissions]);

  // Function to call when user copies BYND link
  const onCopyLinkTrigger = useCallback(() => {
    console.log(' Copy link triggered - refetching data');
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
    onCopyLinkTrigger
  };
}