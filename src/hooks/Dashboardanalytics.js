import { useState, useEffect } from 'react';
import axios from 'axios';

const useAnalytics = (uniqueId) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uniqueId) {
      setAnalyticsData(null);
      return;
    }

    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          // https://bynd-backend.onrender.com
          `https://bynd-backend.onrender.com/getanalytics/${uniqueId}/dashboard-analytics`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setAnalyticsData(response.data.data);
        } else {
          throw new Error(response.data.error || 'Failed to fetch analytics');
        }
      } catch (err) {
        console.error('Analytics fetch error:', err);
        
        if (err.response) {
          setError(`Server error: ${err.response.status}`);
        } else if (err.request) {
          setError('No response from server');
        } else {
          setError(err.message);
        }
        
        // Set default values on error
        setAnalyticsData({
          status: 'pending',
          totalViews: 0,
          uniqueViewers: 0,
          avgTimePerView: 0,
          submissionAge: 0,
          firstViewedOn: null,
          lastViewedAt: null,
          engagementScore: 0,
          engagementBreakdown: { high: 0, moderate: 0, low: 0 },
          viewsOverTime: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

    // Optional: Auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    
    return () => clearInterval(interval);
  }, [uniqueId]);

  return { analyticsData, loading, error };
};

export default useAnalytics;