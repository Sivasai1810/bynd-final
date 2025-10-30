import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AnalyticsDashboard = ({ userId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [viewsOverTime, setViewsOverTime] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const fetchSubmissions = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/userurls", { 
        params: { user_id: userId },
        withCredentials: true 
      });
      
      if (res.data.success && res.data.submissions) {
        const formattedSubmissions = res.data.submissions.map((submission) => ({
          id: submission.id,
          companyName: submission.company_name,
          position: submission.position,
          submittedOn: submission.created_at 
            ? new Date(submission.created_at).toLocaleDateString('en-CA') 
            : 'N/A',
          status: submission.status,
          shareableLink: submission.shareable_link,
          uniqueId: submission.unique_id,
          designType: submission.design_type,
          totalViews: submission.total_views || 0,
          lastViewedAt: submission.last_viewed_at,
          firstViewedAt: submission.first_viewed_at || null,
          createdAt: submission.created_at
        }));
        
        setSubmissions(formattedSubmissions);
      } else {
        setSubmissions([]);
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

  // Calculate stats
  const totalViews = submissions.reduce((sum, s) => sum + s.totalViews, 0);
  const viewedDesigns = submissions.filter(s => s.status !== 'pending').length;
  const avgViews = submissions.length > 0 ? (totalViews / submissions.length).toFixed(1) : 0;
  const engagementRate = submissions.length > 0 
    ? ((viewedDesigns / submissions.length) * 100).toFixed(0) 
    : 0;

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: '#FFF4E6', color: '#F59E0B', border: '#F59E0B' },
      viewed: { bg: '#DBEAFE', color: '#2563EB', border: '#2563EB' },
      approved: { bg: '#D1FAE5', color: '#059669', border: '#059669' },
      rejected: { bg: '#FEE2E2', color: '#DC2626', border: '#DC2626' }
    };
    return styles[status] || styles.pending;
  };

  const copyShareableLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <style>{styleSheet}</style>
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Know when your <span style={styles.greenText}>design</span> gets noticed
        </h1>
        <p style={styles.subtitle}>
          Track views, gain insights, and stay connected — effortlessly.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👁️</div>
          <div style={styles.statContent}>
            <h3 style={styles.statLabel}>Total Views</h3>
            <p style={styles.statValue}>{totalViews}</p>
            <span style={styles.statSubtext}>
              Get real-time updates on whether your design has been seen
            </span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div style={styles.statContent}>
            <h3 style={styles.statLabel}>View Insights</h3>
            <p style={styles.statValue}>{avgViews}</p>
            <span style={styles.statSubtext}>
              Track how much time recruiters spend on each design
            </span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>🎯</div>
          <div style={styles.statContent}>
            <h3 style={styles.statLabel}>Engagement Score</h3>
            <p style={styles.statValue}>{engagementRate}%</p>
            <span style={styles.statSubtext}>
              We calculate an engagement score so you know what's working and what isn't
            </span>
          </div>
        </div>
      </div>

      {/* Everything you need section */}
      <div style={styles.needSection}>
        <h2 style={styles.needTitle}>
          Everything you <span style={styles.greenText}>need</span>
        </h2>
        <p style={styles.needSubtitle}>
          Track metrics, gain insights, and stay in control — effortlessly.
        </p>
      </div>

      {/* Design Submissions Table */}
      <div style={styles.tableSection}>
        <div style={styles.tableSectionHeader}>
          <h2 style={styles.tableSectionTitle}>Design Submissions</h2>
          <div style={styles.filterButtons}>
            <button style={styles.filterButton}>All</button>
            <button style={styles.filterButtonSecondary}>Pending</button>
            <button style={styles.filterButtonSecondary}>Viewed</button>
            <button style={styles.filterButtonSecondary}>Approved</button>
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingState}>
            <div style={styles.spinner}></div>
            <p>Loading analytics...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyStateText}>No submissions yet</p>
            <p style={styles.emptyStateSubtext}>
              Start tracking your design views by creating a submission
            </p>
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Company Name</th>
                  <th style={styles.tableHeader}>Position</th>
                  <th style={styles.tableHeader}>Design Type</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Views</th>
                  <th style={styles.tableHeader}>Submitted On</th>
                  <th style={styles.tableHeader}>First Viewed</th>
                  <th style={styles.tableHeader}>Last Viewed</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  const statusStyle = getStatusBadge(submission.status);
                  return (
                    <tr 
                      key={submission.id} 
                      style={styles.tableRow}
                      onClick={() => setSelectedDesign(
                        selectedDesign?.id === submission.id ? null : submission
                      )}
                    >
                      <td style={styles.tableCell}>
                        <strong>{submission.companyName}</strong>
                      </td>
                      <td style={styles.tableCell}>{submission.position}</td>
                      <td style={styles.tableCell}>
                        <span style={styles.designTypeBadge}>
                          {submission.designType.toUpperCase()}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span 
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            borderColor: statusStyle.border
                          }}
                        >
                          {submission.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.viewsCell}>
                          <span style={styles.viewsNumber}>{submission.totalViews}</span>
                          <span style={styles.viewsIcon}>👁️</span>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        {new Date(submission.submittedOn).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td style={styles.tableCell}>
                        {formatDate(submission.firstViewedAt)}
                      </td>
                      <td style={styles.tableCell}>
                        {formatDate(submission.lastViewedAt)}
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          style={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            copyShareableLink(submission.shareableLink);
                          }}
                        >
                          📋 Copy Link
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedDesign && (
        <div style={styles.modal} onClick={() => setSelectedDesign(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {selectedDesign.companyName} - {selectedDesign.position}
              </h2>
              <button 
                style={styles.closeButton}
                onClick={() => setSelectedDesign(null)}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalGrid}>
                <div style={styles.modalInfoCard}>
                  <h4 style={styles.modalInfoLabel}>Total Views</h4>
                  <p style={styles.modalInfoValue}>{selectedDesign.totalViews}</p>
                </div>

                <div style={styles.modalInfoCard}>
                  <h4 style={styles.modalInfoLabel}>Status</h4>
                  <p style={styles.modalInfoValue}>
                    {selectedDesign.status.toUpperCase()}
                  </p>
                </div>

                <div style={styles.modalInfoCard}>
                  <h4 style={styles.modalInfoLabel}>Design Type</h4>
                  <p style={styles.modalInfoValue}>
                    {selectedDesign.designType.toUpperCase()}
                  </p>
                </div>

                <div style={styles.modalInfoCard}>
                  <h4 style={styles.modalInfoLabel}>Submitted</h4>
                  <p style={styles.modalInfoValue}>
                    {new Date(selectedDesign.submittedOn).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div style={styles.modalSection}>
                <h4 style={styles.modalSectionTitle}>View Timeline</h4>
                <div style={styles.timeline}>
                  <div style={styles.timelineItem}>
                    <span style={styles.timelineDot}></span>
                    <div>
                      <p style={styles.timelineLabel}>First Viewed</p>
                      <p style={styles.timelineValue}>
                        {formatDate(selectedDesign.firstViewedAt)}
                      </p>
                    </div>
                  </div>
                  <div style={styles.timelineItem}>
                    <span style={styles.timelineDot}></span>
                    <div>
                      <p style={styles.timelineLabel}>Last Viewed</p>
                      <p style={styles.timelineValue}>
                        {formatDate(selectedDesign.lastViewedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.modalSection}>
                <h4 style={styles.modalSectionTitle}>Shareable Link</h4>
                <div style={styles.linkBox}>
                  <input 
                    type="text" 
                    value={selectedDesign.shareableLink}
                    readOnly
                    style={styles.linkInput}
                  />
                  <button
                    style={styles.copyButton}
                    onClick={() => copyShareableLink(selectedDesign.shareableLink)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '40px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
  },
  header: {
    maxWidth: '1400px',
    margin: '0 auto 48px',
    textAlign: 'center'
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px',
    lineHeight: '1.2'
  },
  greenText: {
    color: '#1DBC79'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    maxWidth: '1400px',
    margin: '0 auto 48px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e5e5e5',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  },
  statIcon: {
    fontSize: '40px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9f6',
    borderRadius: '12px',
    flexShrink: 0
  },
  statContent: {
    flex: 1
  },
  statLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px'
  },
  statSubtext: {
    fontSize: '13px',
    color: '#999',
    lineHeight: '1.5'
  },
  needSection: {
    maxWidth: '1400px',
    margin: '0 auto 48px',
    textAlign: 'center',
    padding: '40px 0',
    borderTop: '1px solid #e5e5e5',
    borderBottom: '1px solid #e5e5e5'
  },
  needTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '12px'
  },
  needSubtitle: {
    fontSize: '16px',
    color: '#666'
  },
  tableSection: {
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #e5e5e5'
  },
  tableSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  tableSectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  filterButtons: {
    display: 'flex',
    gap: '8px'
  },
  filterButton: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#1DBC79',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  filterButtonSecondary: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    color: '#666',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  loadingState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #1DBC79',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  emptyStateText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px'
  },
  emptyStateSubtext: {
    fontSize: '14px',
    color: '#666'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    borderBottom: '2px solid #e5e5e5'
  },
  tableHeader: {
    padding: '16px 12px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  tableRow: {
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  tableCell: {
    padding: '16px 12px',
    fontSize: '14px',
    color: '#1a1a1a'
  },
  designTypeBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    fontSize: '11px',
    fontWeight: '600',
    color: '#666'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    border: '1px solid'
  },
  viewsCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  viewsNumber: {
    fontWeight: '600',
    fontSize: '16px'
  },
  viewsIcon: {
    fontSize: '16px'
  },
  actionButton: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #1DBC79',
    backgroundColor: 'white',
    color: '#1DBC79',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  modalHeader: {
    padding: '24px',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  closeButton: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f0f0f0',
    color: '#666',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  modalBody: {
    padding: '24px'
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  },
  modalInfoCard: {
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e5e5'
  },
  modalInfoLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '8px',
    textTransform: 'uppercase'
  },
  modalInfoValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a'
  },
  modalSection: {
    marginBottom: '24px'
  },
  modalSectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  timelineItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start'
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#1DBC79',
    marginTop: '4px',
    flexShrink: 0
  },
  timelineLabel: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '4px',
    fontWeight: '600'
  },
  timelineValue: {
    fontSize: '14px',
    color: '#1a1a1a'
  },
  linkBox: {
    display: 'flex',
    gap: '8px'
  },
  linkInput: {
    flex: 1,
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #e5e5e5',
    fontSize: '14px',
    backgroundColor: '#f9fafb'
  },
  copyButton: {
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#1DBC79',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  }
};

// CSS for animations
const styleSheet = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .tableRow:hover {
    background-color: #f9fafb;
  }
  
  .actionButton:hover {
    background-color: #1DBC79;
    color: white;
  }
  
  .filterButtonSecondary:hover {
    border-color: #1DBC79;
    color: #1DBC79;
  }
  
  .closeButton:hover {
    background-color: #e5e5e5;
  }
  
  .copyButton:hover {
    background-color: #18a865;
  }
`;

export default AnalyticsDashboard;