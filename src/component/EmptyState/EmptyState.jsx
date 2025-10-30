import React from 'react';
import viewtracking from "../../assets/viewtracking.svg"
import Engagementsgraphs from "../../assets/Engagementsgraph.svg"
import Engagementsempty from "../../assets/Engagementsempty.svg"
import Analyticsreport from "../../assets/Engagementsempty.svg"
import './EmptyState.css';

export default function EmptyState({ onNewSubmission }) {
  return (
    <div className="empty-state-container">
      <div className="empty-state-features">
            <div className='empty-state-features-sections'>
 <img src={Engagementsgraphs}></img>
 <p>ENGAGEMENT GRAPH</p>
            </div>
         <div className='empty-state-features-sections'>
 <img src={Engagementsempty}></img>
 <p>REAL-TIME NOTIFICATIONS</p>
            </div>
              <div className='empty-state-features-sections'>
 <img src={viewtracking}></img>
 <p>VIEW TRACKING</p>
            </div>
             <div className='empty-state-features-sections'>
 <img src={Analyticsreport}></img>
 <p>ANALYTICS REPORT</p>
            </div>

      </div>

      <div className="empty-state-content">
        <h1 className="empty-state-title">
          Track and document your design submissions
        </h1>
        <p className="empty-state-subtitle">
          Submit your design and track views, status, and recruiter engagement
        </p>
        <button className="empty-state-button" onClick={onNewSubmission}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New submission
        </button>
      </div>
    </div>
  );
}