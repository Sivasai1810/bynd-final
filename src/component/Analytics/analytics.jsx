import React, { useState, useEffect } from "react";
import useAnalytics from "../../hooks/Dashboardanalytics";
import SubmissionForm from "../SubmissionForm/SubmissionForm";
import SubmissionAge from "../../assets/Submissionage.svg"
import Status from "../../assets/statusimg.svg";
import Totalview from "../../assets/totalview.svg";
import Averagetime from "../../assets/Averagetimeper.svg";
import Firstviewedon from "../../assets/viewtracking.svg";
import Lastviewedon from "../../assets/lastviewedon.svg";
import Engagement from "../../assets/Engagements.svg";
import "./analytics.css";

const Analytics = ({ submissions, loading, selectedSubmission, onSubmissionComplete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState(selectedSubmission);
  
 
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pastedUrl, setPastedUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { analyticsData, loading: analyticsLoading, error: analyticsError } = useAnalytics(currentSubmissionId);

  useEffect(() => {
    if (selectedSubmission) {
      setCurrentSubmissionId(selectedSubmission);
    } else if (submissions && submissions.length > 0) {
      setCurrentSubmissionId(submissions[0].uniqueId);
    }
  }, [selectedSubmission, submissions]);

const calculateSubmissionAge = (createdAt) => {
  if (!createdAt) return "--";

  const submittedDate = new Date(createdAt);
  const today = new Date();

  // normalize both to midnight IST
  const start = new Date(
    submittedDate.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
  );
  const end = new Date(
    today.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
  );

  const diffMs = end - start;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  return `${diffDays} days`;
};



const formatDate = (date) => {
  if (!date) return "Not yet viewed";

  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};



  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) {
      return `${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const handleSubmissionSelect = (submissionId) => {
    setCurrentSubmissionId(submissionId);
    setIsDropdownOpen(false);
  };


  const handleAddNewAssignment = () => {
    setShowSubmissionForm(true);
  };

  const handleCloseForm = () => {
    setShowSubmissionForm(false);
    // Reset form fields
    setPdfFile(null);
    setPastedUrl("");
    setCompanyName("");
    setPosition("");
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
     
      if (onSubmissionComplete) {
        await onSubmissionComplete({ companyName, position, pdfFile, pastedUrl });
      }
      
      // Close form and reset
      handleCloseForm();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
if (analyticsLoading && !analyticsData) {
  return (
    <div className="anl-loading-wrapper">
      <div className="anl-spinner"></div>
      <p className="anl-loading-text">Loading analytics...</p>
    </div>
  );
}


  if (!submissions || submissions.length === 0) {
    return (
      <div className="anl-container">
        <div className="anl-empty-state">
          <p>No submissions found</p>
        </div>
      </div>
    );
  }

  const submissionData = submissions.find(s => s.uniqueId === currentSubmissionId) || submissions[0];

  if (!submissionData) {
    return (
      <div className="anl-container">
        <div className="anl-empty-state">
          <p>No submissions found</p>
        </div>
      </div>
    );
  }

  if (analyticsLoading && !analyticsData) {
    return (
      <div className="anl-container">
        <div className="anl-loading-state">Loading analytics...</div>
      </div>
    );
  }
const createdAt = analyticsData?.createdAt;
  const statusText = analyticsData?.status === 'viewed' ? 'Viewed' : 'Pending';
  const statusClass = analyticsData?.status === 'viewed' ? 'status-viewed' : 'status-pending';
  const totalViews = analyticsData?.totalViews ?? 0;
  const uniqueViewers = analyticsData?.uniqueViewers ?? 0;
  const avgTime = analyticsData?.avgTimePerView ?? 0;
  const lastViewed = analyticsData?.lastViewedAt;
  const firstViewed = analyticsData?.firstViewedOn;
  const engagementScore = analyticsData?.engagementScore ?? 0;
  const engagementBreakdown = analyticsData?.engagementBreakdown || { high: 0, moderate: 0, low: 0 };
const viewsOverTime = (() => {
  if (analyticsData?.viewsOverTime?.length > 0) {
    return analyticsData.viewsOverTime;
  }

  if (!createdAt || !firstViewed || totalViews === 0) return [];

  const created = new Date(createdAt);
  const viewed = new Date(firstViewed);

  const start = new Date(
    created.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
  );
  const viewDay = new Date(
    viewed.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
  );

  const day =
    Math.floor((viewDay - start) / (1000 * 60 * 60 * 24)) + 1;

  return [
    {
      day,
      views: totalViews, // ✅ TOTAL VIEWS ONLY
    },
  ];
})();



  return (
    <>
      <div className="anl-container">
        {analyticsError && (
          <div className="anl-error-banner" style={{
            padding: '12px',
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
            color: '#991B1B',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {analyticsError}
          </div>
        )}

        <div className="anl-header">
          <h2>Select assignment</h2>
        </div>

        <div className="anl-assignment-selector">
          <div className="anl-assignment-dropdown">
            <div 
              className="anl-dropdown-content"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <p className="anl-assignment-title">
                {submissionData.companyName} - {submissionData.position}
              </p>

              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                style={{ 
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <path 
                  d="M5 7.5L10 12.5L15 7.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="anl-dropdown-menu">
                {submissions.map((submission) => (
                  <div
                    key={submission.uniqueId}
                    className={`anl-dropdown-item ${
                      submission.uniqueId === currentSubmissionId ? "active" : ""
                    }`}
                    onClick={() => handleSubmissionSelect(submission.uniqueId)}
                  >
                    <div className="anl-dropdown-item-content">
                      <p className="anl-dropdown-item-title">
                        {submission.companyName} - {submission.position}
                      </p>
                    </div>

                    {submission.uniqueId === currentSubmissionId && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M16.6666 5L7.49998 14.1667L3.33331 10"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="anl-meta-row">
            {/* <p className="anl-submission-date">
              Submitted on {submissionData.submittedOn}
            </p> */}
            <p className="anl-submission-date">
  Submitted on {formatDate(createdAt)}

</p>


            <button 
              className="anl-add-assignment-btn"
              onClick={handleAddNewAssignment}
            >
              + Add new assignment
            </button>
          </div>
        </div>

        <div className="anl-summary-section">
          <h3 className="anl-summary-heading">Assignment summary</h3>

          <div className="anl-summary-grid">
            <div className="anl-summary-card">
              <img src={Status} className="anl-card-icon" alt="Status" />
              <p className="anl-card-label">Status</p>
              <p className={`anl-card-value ${statusClass}`}>{statusText}</p>
            </div>

            <div className="anl-summary-card">
              <img src={Totalview} className="anl-card-icon" alt="Unique viewers" />
              <p className="anl-card-label">Total views</p>
              <p className="anl-card-value">{uniqueViewers}</p>
            </div>

            <div className="anl-summary-card">
              <img src={Averagetime} className="anl-card-icon" alt="Average time" />
              <p className="anl-card-label">Average time per view</p>
              <p className="anl-card-value">{formatTime(avgTime)}</p>
            </div>

            <div className="anl-summary-card">
              <img src={SubmissionAge} className="anl-card-icon" alt="Submission age" />
              <p className="anl-card-label">Submission age</p>
              {/* <p className="anl-card-value">{analyticsData?.submissionAge ?? calculateSubmissionAge(submissionData.submittedOn)} days</p> */}
              <p className="anl-card-value">
{calculateSubmissionAge(createdAt)}

</p>

            </div>

            <div className="anl-summary-card">
              <img src={Lastviewedon} className="anl-card-icon" alt="First viewed" />
              <p className="anl-card-label">First viewed on</p>
              {/* <p className="anl-card-value">{formatDate(firstViewed)}</p> */}
              <p className="anl-card-value">
  {formatDate(firstViewed)}
</p>

            </div>

            <div className="anl-summary-card">
              <img src={Lastviewedon} className="anl-card-icon" alt="Last viewed" />
              <p className="anl-card-label">Last viewed on</p>
              {/* <p className="anl-card-value">{formatDate(lastViewed)}</p> */}
              <p className="anl-card-value">
  {formatDate(lastViewed)}
</p>

            </div>

            <div className="anl-engx-card">
            

              <div className="anl-engx-left">
                <img src={Engagement} className="anl-engx-icon" alt="Engagement" />
                <p className="anl-engx-label">Engagement score</p>

                    <p
                  className={`anl-engx-value 
                    ${engagementScore >= 70 ? "eng-high" : 
                      engagementScore >= 40 ? "eng-moderate" : "eng-low"}
                  `}
                >
                  {uniqueViewers > 0
                    ? engagementScore >= 70
                      ? "High"
                      : engagementScore >= 40
                      ? "Moderate"
                      : "Low"
                    : "--"}
                </p>
              </div>

        <div className="anl-engx-donut">
  {(() => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const percent = engagementScore || 0;
    const dash = (percent / 100) * circumference;

    let color = "#EF4444";
    if (engagementScore >= 70) color = "#22C55E";
    else if (engagementScore >= 40) color = "#FACC15";

    return (
      <svg width="130" height="130" viewBox="0 0 120 120">
        {/* Background Ring */}
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#E5E7EB"
          strokeWidth="12"
          fill="none"
        />

        {/* Foreground Progress Ring */}
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />

        {/* Percent Text */}
        <text
          x="60"
          y="66"
          textAnchor="middle"
          fontSize="22"
          fontWeight="600"
        >
          {percent}%
        </text>
      </svg>
    );
  })()}
</div>


              <div className="anl-engx-legend-center">
                <div className="legend-item">
                  <span className="legend-square high"></span>
                  <span>High</span>
                </div>
                <div className="legend-item">
                  <span className="legend-square moderate"></span>
                  <span>Moderate</span>
                </div>
                <div className="legend-item">
                  <span className="legend-square low"></span>
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="anl-views-over-time">
          <div className="anl-views-header">
            <h3>Views over time</h3>
          </div>

          <div className="anl-chart-container">
            <div className="anl-chart-header-section">
              <p className="anl-chart-title">
                {totalViews === 0 ? 'Not viewed' : `${totalViews} ${totalViews === 1 ? 'View' : 'Views'}`}
              </p>
            </div>


{(() => {
  // const maxDataViews = Math.max(...viewsOverTime.map(v => v.views), 1);
  const maxDataViews =
  viewsOverTime.length > 0
    ? Math.max(...viewsOverTime.map(v => v.views))
    : 1;

  const normalizedData = viewsOverTime.map(point => ({
    ...point,
    normalizedViews: maxDataViews > 5 
      ? Math.min((point.views / maxDataViews) * 5, 5) 
      : point.views
  }));

  const fullWeekData = Array.from({ length: 8 }, (_, i) => {
    const existing = normalizedData[i];
    return existing || { day: i + 1, views: 0, normalizedViews: 0 };
  });

 return totalViews === 0 ? (
  <div className="anl-chart-svg-wrapper">
    <svg className="anl-line-chart" viewBox="0 0 1000 420" style={{ display: "block" }}>

      {/* Y-Axis Title */}
      <text 
        x="-200" 
        y="20" 
        transform="rotate(-90)" 
        fontSize="15" 
        fill="#111827"
        textAnchor="middle"
        fontWeight="600"
      >
        Total views
      </text>

      {/* GRIDLINES (0 to 5) */}
      {[0,1,2,3,4,5].map((v) => {
        const y = 340 - (v * 56);
        return (
          <line
            key={v}
            x1="60"
            y1={y}
            x2="960"
            y2={y}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        );
      })}

      {/* Y axis + baseline */}
      <line x1="60" y1="60" x2="60" y2="340" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="60" y1="340" x2="960" y2="340" stroke="#9CA3AF" strokeWidth="2" />

      {/* Y-axis tick labels */}
      <text x="45" y="64" fontSize="12" fill="#9CA3AF" textAnchor="end">5</text>
      <text x="45" y="120" fontSize="12" fill="#9CA3AF" textAnchor="end">4</text>
      <text x="45" y="176" fontSize="12" fill="#9CA3AF" textAnchor="end">3</text>
      <text x="45" y="232" fontSize="12" fill="#9CA3AF" textAnchor="end">2</text>
      <text x="45" y="288" fontSize="12" fill="#9CA3AF" textAnchor="end">1</text>
      <text x="45" y="345" fontSize="12" fill="#9CA3AF" textAnchor="end">0</text>

      {/* FLAT LINE AT ZERO - connects all points */}
      <line 
        x1="60" 
        y1="340" 
        x2={60 + (880/7)*7} 
        y2="340" 
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* DOTS - all small filled dots at baseline (y=340) */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const x = 60 + (880/7) * i;
        return (
          <circle 
            key={i}
            cx={x} 
            cy="340" 
            r="5" 
            fill="#10B981"
          />
        );
      })}

      {/* X-axis labels */}
      {[1,2,3,4,5,6,7,8].map((day, i) => {
        const x = 60 + (880/7) * i;
        return (
          <text key={i} x={x} y="370" textAnchor="middle" fontSize="16" fill="#111827" fontWeight="500">
            Day {day}
          </text>
        );
      })}

      {/* bottom axis title */}
      <text x="510" y="400" textAnchor="middle" fontSize="16" fill="#111827" fontWeight="500">
        Days after submission
      </text>

    </svg>
  </div>
) : (
    <div className="anl-chart-svg-wrapper">
      <svg className="anl-line-chart" viewBox="0 0 1000 420" style={{ display: 'block' }}>
        <text 
          x="-200" 
          y="20" 
          transform="rotate(-90)" 
          fontSize="15" 
          fill="#111827"
          textAnchor="middle"
          fontWeight="600"
        >
          Total views
        </text>

        {[0, 1, 2, 3, 4, 5].map((val) => {
          const y = 340 - (val * 56);
          return (
            <line 
              key={val}
              x1="60" 
              y1={y} 
              x2="960" 
              y2={y} 
              stroke="#E5E7EB" 
              strokeWidth="1"
            />
          );
        })}

        <line x1="60" y1="60" x2="60" y2="340" stroke="#9CA3AF" strokeWidth="1" />
        <line x1="60" y1="340" x2="960" y2="340" stroke="#9CA3AF" strokeWidth="2" />

        <text x="45" y="64" fontSize="12" fill="#9CA3AF" textAnchor="end">5</text>
        <text x="45" y="120" fontSize="12" fill="#9CA3AF" textAnchor="end">4</text>
        <text x="45" y="176" fontSize="12" fill="#9CA3AF" textAnchor="end">3</text>
        <text x="45" y="232" fontSize="12" fill="#9CA3AF" textAnchor="end">2</text>
        <text x="45" y="288" fontSize="12" fill="#9CA3AF" textAnchor="end">1</text>
        <text x="45" y="345" fontSize="12" fill="#9CA3AF" textAnchor="end">0</text>

       {fullWeekData.map((point, i) => {
  const x = 60 + (880 / 7) * i;
  const y = 340 - (point.normalizedViews * 56);
  const hasViews = point.views > 0;
  const radius = 7; // Changed from 9 to 6
  const strokeWidth = 3;
  
  return (
    <g key={i}>
      {/* LINE (passing through circle center) */}
      {i > 0 && (() => {
        const prevPoint = fullWeekData[i - 1];
        const prevX = 60 + (880 / 7) * (i - 1);
        const prevY = 340 - (prevPoint.normalizedViews * 56);
        const prevHasViews = prevPoint.views > 0;
        
        // Calculate direction vector
        const dx = x - prevX;
        const dy = y - prevY;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx / len;
        const uy = dy / len;
        
        // Calculate start and end points based on circle edges
        const startX = prevHasViews ? prevX + ux * radius : prevX;
        const startY = prevHasViews ? prevY + uy * radius : prevY;
        const endX = hasViews ? x - ux * radius : x;
        const endY = hasViews ? y - uy * radius : y;
        
        return (
          <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            style={{
              stroke: "#10B981",
              strokeWidth: 2,
              strokeLinecap: "round"
            }}
          />
        );
      })()}
      
      {/* DOTS */}
      {hasViews ? (
        <circle
          cx={x}
          cy={y}
          r={radius}
          style={{
            fill: "white",
            stroke: "#10B981",
            strokeWidth: strokeWidth,
          }}
        />
      ) : (
        <circle
          cx={x}
          cy={y}
          r={5}
          style={{ fill: "#10B981" }}
        />
      )}
    </g>
  );
})}

        {[1, 2, 3, 4, 5, 6, 7, 8].map((day, i) => {
          const x = 60 + (880 / 7) * i;
          return (
            <text key={i} x={x} y="370" textAnchor="middle" fontSize="16" fill="#111827" fontWeight="500">
              Day {day}
            </text>
          );
        })}
        
        <text x="510" y="400" textAnchor="middle" fontSize="16" fill="#111827" fontWeight="500">
          Days after submission
        </text>
      </svg>
    </div>
  );
})()}
          </div>

          <div className="anl-activity-indicator">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '15px', 
                height: '15px', 
                borderRadius: '50%', 
                border: '2px solid #10B981',
                background: 'white'
              }}></div>
              <span className="anl-activity-text" style={{ color: '#6B7280' }}>Viewed</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: '15px', 
                height: '15px', 
                borderRadius: '50%', 
                background: '#10B981'
              }}></div>
              <span className="anl-activity-text" style={{ color: '#6B7280' }}>No Activity</span>
            </div>
          </div>

          {uniqueViewers > 0 && firstViewed ? (
            <p className="anl-opened-message">
              The assignment was opened once on Day {(() => {
                const submittedDate = new Date(submissionData.submittedOn);
                const firstViewedDate = new Date(firstViewed);
                const diffTime = Math.abs(firstViewedDate - submittedDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays;
              })()}.
            </p>
          ) : (
            <p className="anl-opened-message">
              The assignment has not been opened since submission.
            </p>
          )}
        </div>
        <div className="info-footer">
          <p>Metrics shown are estimates based on tracking signals and may not be fully precise. Use them as directional insights, not definitive proof.</p>
        </div>
      </div>

      <SubmissionForm
        showForm={showSubmissionForm}
        onClose={handleCloseForm}
        pdfFile={pdfFile}
        setPdfFile={setPdfFile}
        pastedUrl={pastedUrl}
        setPastedUrl={setPastedUrl}
        companyName={companyName}
        setCompanyName={setCompanyName}
        position={position}
        setPosition={setPosition}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default Analytics;