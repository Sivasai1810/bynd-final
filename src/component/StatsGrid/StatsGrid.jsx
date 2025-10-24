import React from 'react';
import Activesubmission from "../../assets/activesubmission.svg";
import Availableslots from "../../assets/available slots.svg";
import Counts from "../../assets/count.svg";
import Lastviewed from "../../assets/lastviewed.svg";
import './StatsGrid.css';

export default function StatsGrid({ stats }) {
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
        <div className="stat-value">{stats.available_slots}</div>
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
        <div className="stat-value">
          {stats.last_viewed_assignment ? stats.last_viewed_assignment.company_name : 'None'}
        </div>
      </div>
    </div>
  );
}