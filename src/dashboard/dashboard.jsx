import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../dashboard/dashboard.css';
import Logo from "../assets/byndlogo.svg";
import Addsymbol from "../assets/addsymbol.svg";
import Profile from "../assets/profiles.svg";
import Dashsymbol from "../assets/dashsymbol.svg";
import Analytics from "../assets/Analytics.svg";
import Notification from "../assets/sidenotification.svg";
import Search from "../assets/search.svg";
import Activesubmission from "../assets/activesubmission.svg";
import Availableslots from "../assets/available slots.svg";
import Counts from "../assets/count.svg";
import Lastviewed from "../assets/lastviewed.svg";
import Upgradetopro from "../assets/upgradetopro.svg";
import Prorocket from "../assets/prorocket.svg";
import axios from "axios";

// ================= Toast Notification =================
const Toast = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 10; // Update every 10ms
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: 'white',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      minWidth: '300px',
      maxWidth: '400px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px'
    }}>
      <span style={{
        flex: 1,
        fontSize: '14px',
        color: '#333',
        fontWeight: '500'
      }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '20px',
          color: '#999',
          cursor: 'pointer',
          padding: '0',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: '1'
        }}
      >
        ×
      </button>
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: '3px',
        width: `${progress}%`,   // ✅ FIXED
        backgroundColor: '#1DBC79',
        transition: 'width 0.01s linear',
        borderBottomRightRadius: progress > 5 ? '0' : '8px',
        borderBottomLeftRadius: '8px'
      }} />
    </div>
  );
};

// ================= Profile Dropdown =================
const ProfileDropdown = ({ profile, onLogout }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '70px',
      right: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      padding: '16px',
      minWidth: '300px',
      zIndex: 9998
    }}>
      <div style={{
        textAlign: 'center',
        paddingBottom: '16px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#333'
        }}>
          {profile?.user_name || 'User'}
        </p>
        <p style={{
          margin: '0',
          fontSize: '14px',
          color: '#666'
        }}>
          {profile?.user_email || 'email@example.com'}
        </p>
      </div>
      <button
        onClick={onLogout}
        style={{
          width: '100%',
          marginTop: '12px',
          padding: '10px 16px',
          backgroundColor: '#ff4757',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#ff3838'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4757'}
      >
        Logout
      </button>
    </div>
  );
};

// ================= Dashboard =================
export default function Dashboard() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pastedUrl, setPastedUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [designInfo, setDesignInfo] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:3000/fetch/profile", {}, { withCredentials: true });
        setProfile(res.data.profile);
      } catch (error) {
        showNotification('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Fetch submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setSubmissionsLoading(true);
        const res = await axios.get("http://localhost:3000/userurls", { withCredentials: true });
        if (res.data.submissions && res.data.submissions.length > 0) {
          const formatted = res.data.submissions.map((s) => ({
            id: s.id,
            pastedUrl: s.pasted_url,
            companyName: s.companyname,
            position: s.position,
            submittedOn: s.created_at ? new Date(s.created_at).toLocaleDateString('en-CA') : 'N/A',
            status: s.status,
            shareableLink: s.shareable_link,
            uniqueId: s.unique_id,
            previewUrl: s.preview_url
          }));
          setDesignInfo(formatted);
        } else setDesignInfo([]);
      } catch (error) {
        showNotification('Failed to load submissions');
      } finally {
        setSubmissionsLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const showNotification = (msg) => setNotification(msg);
  const closeNotification = () => setNotification(null);

  const handleCopyLink = (link) => {
    if (!link) return showNotification("No link available to copy");
    navigator.clipboard.writeText(link)
      .then(() => showNotification("BYND link copied to clipboard"))
      .catch(() => showNotification("Failed to copy link"));
  };

  const handleLogout = () => {
    setProfile(null);
    setShowProfileDropdown(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showProfileDropdown && !e.target.closest('.avatar-container')) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileDropdown]);

  const activeSubmissions = designInfo.length;
  const availableSlots = Math.max(3 - activeSubmissions, 0);

  const handleShowForm = () => {
    if (availableSlots > 0) setShowForm(true);
    else showNotification("Maximum 3 submissions allowed!");
  };

  const handleStoreData = async () => {
    try {
      setIsSubmitting(true);
      const payload = {
        pasted_url: pastedUrl.trim(),
        companyname: companyName.trim(),
        position: position.trim(),
        status: "pending",
        created_at: new Date().toISOString()
      };
      const res = await axios.post("http://localhost:3000/storeurls", payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      const newSubmission = {
        id: designInfo.length + 1,
        pastedUrl,
        companyName,
        position,
        submittedOn: new Date().toLocaleDateString('en-CA'),
        status: "pending",
        shareableLink: res.data.shareableLink,
        pdfFile
      };

      setDesignInfo(prev => [...prev, newSubmission]);
      setPdfFile(null);
      setPastedUrl("");
      setCompanyName("");
      setPosition("");
      setShowForm(false);
      showNotification("Design submission added successfully!");
    } catch (error) {
      showNotification(error.response?.data?.error || error.message || "Failed to submit design");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {notification && <Toast message={notification} onClose={closeNotification} />}

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo"><img src={Logo} alt="BYND Logo" className="logo-img" /></div>
        <div className="section">
          <div className="section-label">MAIN</div>
          <button className="menu-item" onClick={handleShowForm}>
            <img src={Addsymbol} alt="Add" className="menu-icon" />
            <span>New Design Submission</span>
          </button>
          <button className="menu-item">
            <img src={Dashsymbol} alt="Dashboard" className="menu-icon" />
            <span>Dashboard</span>
          </button>
        </div>

        <div className="section">
          <div className="section-label">PRO</div>
          <button className="menu-item">
            <img src={Analytics} alt="Analytics" className="menu-icon" />
            <span>Analytics</span>
          </button>
          <button className="menu-item">
            <img src={Notification} alt="Notifications" className="menu-icon" />
            <span>Notification</span>
          </button>
        </div>

        <div className="upgrade-card">
          <p className="upgrade-text">
            Get real-time insights, alerts & unlimited submissions — free for 14 days.
          </p>
          <button className="upgrade-button">Upgrade to Pro</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="search-container">
            <img src={Search} alt="Search" className="search-icon" />
            <input type="text" placeholder="Search assignments" className="search-input" />
          </div>
          <button onClick={handleShowForm} className="new-submission-btn">
            <img src={Addsymbol} alt="Add" className="btn-icon" />
            <span>New submission</span>
          </button>
          <div className="avatar-container" style={{ position: 'relative' }}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <div className="avatar" style={{ cursor: 'pointer' }}>
              <img src={Profile} alt="User Avatar" className="avatar-img" />
            </div>
            {showProfileDropdown && profile && (
              <ProfileDropdown profile={profile} onLogout={handleLogout} />
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon"><img src={Activesubmission} alt="" /></div><div className="stat-label">Active submissions</div><div className="stat-value">{activeSubmissions}</div></div>
          <div className="stat-card"><div className="stat-icon"><img src={Availableslots} alt="" /></div><div className="stat-label">Available slots</div><div className="stat-value">{availableSlots}</div></div>
          <div className="stat-card"><div className="stat-icon"><img src={Counts} alt="" /></div><div className="stat-label">Total assignments viewed</div><div className="stat-value">1</div></div>
          <div className="stat-card"><div className="stat-icon"><img src={Lastviewed} alt="" /></div><div className="stat-label">Last assignment viewed</div><div className="stat-value">Zodiac Agency</div></div>
        </div>
 <div className="pro-banner">
          <div className="pro-banner-content">
            <div className="pro-banner-text">
              <p className="pro-banner-title">
                Unlock powerful insights and notifications to stand out — upgrade to Pro and enjoy a 14-day <strong>free</strong> trial today.
              </p>
              <button className="upgrade-pro-btn">
                <img src={Prorocket} alt="Upgrade"></img>
                <span> Upgrade to Pro</span>
              </button>
              <span className="no-credit-card">No credit card required</span>
            </div>
          </div>
          <img src={Upgradetopro} alt="Pro illustration" className="pro-illustration" />
        </div>
        {/* Table */}
        <h2 className="table-title">Design Submissions</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Company name</th>
                <th>Position</th>
                <th>Submitted on</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissionsLoading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>LOADING...</td></tr>
              ) : activeSubmissions > 0 ? (
                designInfo.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.companyName}</td>
                    <td>{s.position}</td>
                    <td>{s.submittedOn}</td>
                    <td>
                      <span className={`status-badge status-${s.status}`}>  {/* ✅ FIXED */}
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn" onClick={() => handleCopyLink(s.shareableLink)}>Copy BYND Link</button>
                      <button className="more-btn">⋮</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>NO DATA FOUND</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className='form-container'>
          <div className='form-box'>
            <p className='close-btn' onClick={() => setShowForm(false)}>x</p>
            <div className='header-text'><p>New <span>Design</span> Submission</p></div>
            <span className='side-heading'>Upload Design PDF</span>
            <input
              type='file'
              className='fields'
              onChange={(e) => setPdfFile(e.target.files[0])}
              disabled={pastedUrl.trim() !== ""}
            />
            <span className='side-heading'>Paste Design URL*</span>
            <input
              type='text'
              className='fields'
              value={pastedUrl}
              onChange={(e) => setPastedUrl(e.target.value)}
              placeholder='http://examplefigma-url.com'
              disabled={pdfFile !== null}
            />
            <span className='side-heading'>Company Name*</span>
            <input
              type='text'
              className='fields'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder='Enter Company name'
            />
            <span className='side-heading'>Position*</span>
            <input
              type='text'
              className='fields'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder='Enter position'
            />
            <button
              onClick={handleStoreData}
              disabled={!companyName || !position || (!pdfFile && !pastedUrl) || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

