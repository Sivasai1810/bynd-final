import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchSubmissions = async () => {
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
    };

    fetchSubmissions();
    
    const interval = setInterval(fetchSubmissions, 30000);
    return () => clearInterval(interval);
    
  }, [userId, navigate]);

  const deleteSubmission = async (submissionId) => {
    try {
      const res = await axios.delete(`https://bynd-backend.onrender.com/submissions/${submissionId}`, {
        withCredentials: true
      });

      if (res.data.success) {
        setSubmissions(prev => prev.filter(s => s.id !== submissionId));
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

  return { submissions, setSubmissions, stats, setStats, loading, deleteSubmission };
}