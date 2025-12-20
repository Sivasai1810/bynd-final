
import React from 'react';
import Activesubmission from "../../assets/activesubmission.svg";
import Availableslots from "../../assets/available slots.svg";
import Counts from "../../assets/count.svg";
import Lastviewed from "../../assets/lastviewed.svg";
import useUserPlan from "../../hooks/useUserPlan";
import './StatsGrid.css';

export default function StatsGrid({ stats }) {
  const { isFree, isPro, isTrial } = useUserPlan();
  
  // Show infinity symbol for Pro/Trial users, otherwise show actual slots
  const isProUser = isPro || isTrial;
  const availableSlots = isProUser ? '∞' : stats.available_slots;
  // Format last viewed display
  const getLastViewedDisplay = () => {
    if (!stats.last_viewed_assignment) {
      return 'Not yet viewed';
    }
    
    const { company_name, last_viewed_at } = stats.last_viewed_assignment;
    
    // Format the timestamp
    let timeDisplay = '';
    if (last_viewed_at) {
      try {
       new Date(last_viewed_at);
      } catch (e) {
        console.error('Error formatting date:', e);
      }
    }
    
    return (
      <div className="last-viewed-info">
        <div className="last-viewed-company">{company_name}</div>
      </div>
    );
  };
  
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">
          <img src={Activesubmission} alt="Active submissions" />
        </div>
        <div className="stat-label">Active submissions</div>
        <div className="stat-value">{stats.active_submissions}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <img src={Availableslots} alt="Available slots" />
        </div>
        <div className="stat-label">Available slots</div>
        <div className="stat-value">
          {isProUser ? <span className="infinity-symbol">∞</span> : stats.available_slots}
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <img src={Counts} alt="Total assignments viewed" />
        </div>
        <div className="stat-label">Total assignments viewed</div>
        <div className="stat-value">{stats.total_assignments_viewed}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <img src={Lastviewed} alt="Last assignment viewed" />
        </div>
        <div className="stat-label">Last assignment viewed</div>
        <div className="stat-value last-viewed-value">
          {getLastViewedDisplay()}
        </div>
      </div>
    </div>
  );
}