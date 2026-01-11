
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useSubmissions(userId) {
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({
    active_submissions: 0,
    available_slots: 3,
    total_assignments_viewed: 0,
    last_viewed_assignment: null,
  });
  const [loading, setLoading] = useState(false);

  const pollingIntervalRef = useRef(null);
  const abortControllerRef = useRef(null);

  
  const fetchSubmissions = useCallback(
    async ({ silent = false } = {}) => {
      if (!userId) return;

      if (!silent) setLoading(true);

      // Cancel any previous in-flight request
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const res = await axios.get(
          "https://bynd-backend.onrender.com/userurls",
          {
            params: { user_id: userId },
            withCredentials: true,
            signal: abortControllerRef.current.signal,
          }
        );

        if (res.data.success && res.data.submissions) {
         const formattedSubmissions = res.data.submissions.map((s) => ({
  id: s.id,
  companyName: s.company_name,
  position: s.position,
  submittedOn: s.created_at
    ? new Date(s.created_at).toLocaleDateString("en-CA")
    : "N/A",
  status: s.status || "pending",
  uniqueId: s.unique_id,
  shareableLink: s.shareable_link, 
  lastViewedAt: s.last_viewed_at,
}));


          setSubmissions(formattedSubmissions);
          setStats(res.data.stats);
        } else {
          setSubmissions([]);
          setStats({
            active_submissions: 0,
            available_slots: 3,
            total_assignments_viewed: 0,
            last_viewed_assignment: null,
          });
        }
      } catch (error) {
        if (axios.isCancel(error)) return;

        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [userId, navigate]
  );


  useEffect(() => {
    fetchSubmissions();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchSubmissions]);

  useEffect(() => {
    if (!userId || submissions.length === 0) return;

    pollingIntervalRef.current = setInterval(() => {
      fetchSubmissions({ silent: true });
    }, 40000);

    return () => {
      clearInterval(pollingIntervalRef.current);
    };
  }, [userId, submissions.length, fetchSubmissions]);


  const deleteSubmission = async (uniqueId) => {
    try {
      const res = await axios.delete(
        `https://bynd-backend.onrender.com/submissions/delete/${uniqueId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setSubmissions((prev) =>
          prev.filter((s) => s.uniqueId !== uniqueId)
        );

        setStats((prev) => ({
          ...prev,
          active_submissions: Math.max(prev.active_submissions - 1, 0),
          available_slots: Math.min(prev.available_slots + 1, 3),
        }));

        return true;
      }

      return false;
    } catch (error) {
      console.error("Delete submission error:", error);
      throw error;
    }
  };

 
  const refetchSubmissions = useCallback(() => {
    return fetchSubmissions();
  }, [fetchSubmissions]);

  
  const onCopyLinkTrigger = useCallback(() => {
    fetchSubmissions({ silent: true });
  }, [fetchSubmissions]);

  return {
    submissions,
    setSubmissions,
    stats,
    setStats,
    loading,
    deleteSubmission,
    refetchSubmissions,
    onCopyLinkTrigger,
  };
}
