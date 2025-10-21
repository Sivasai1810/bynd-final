import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './sign.css'

// Toast Notification Component
const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 50));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return { bg: '#10b981', border: '#059669' };
      case 'error':
        return { bg: '#ef4444', border: '#dc2626' };
      case 'warning':
        return { bg: '#f59e0b', border: '#d97706' };
      case 'info':
        return { bg: '#3b82f6', border: '#2563eb' };
      default:
        return { bg: '#10b981', border: '#059669' };
    }
  };

  const colors = getStyles();

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        minWidth: '300px',
        maxWidth: '400px',
        zIndex: 9999,
        overflow: 'hidden',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: colors.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
              {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </span>
          </div>
          <span style={{ color: '#111827', fontSize: '14px', lineHeight: '1.5' }}>
            {message}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            flexShrink: 0
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          ×
        </button>
      </div>
      <div
        style={{
          height: '3px',
          backgroundColor: colors.border,
          width: `${progress}%`,
          transition: 'width 0.05s linear'
        }}
      />
    </div>
  );
};

const SignUp = () => {
  const Navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [toasts, setToasts] = useState([]);

  // Add slideIn animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Toast functions
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSignup = async () => {
    // Validation
    if (!firstName || !lastName) {
      showToast("Please enter your full name", "warning");
      return
    }
    if (!email) {
      showToast("Please enter your email", "warning");
      return
    }
    if (!password) {
      showToast("Please enter a password", "warning");
      return
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return
    }
    if (!agreeTerms) {
      showToast("Please agree to the terms and conditions", "warning");
      return
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", {
        user_name: `${firstName} ${lastName}`,
        user_email: email,
        user_password: password
      }, { withCredentials: true })
      
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setAgreeTerms(false)

      if (res.data.success === true) {
        showToast("Account created successfully! 🎉", "success");
        setTimeout(() => {
          Navigate('/Dashboard')
        }, 1000);
      } else {
        showToast(res.data.message, "error");
      }
    } catch (err) {
      console.log("Sign up error", err)
      showToast("Sign up failed. Please try again.", "error");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="signup-container">
      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <div className="signup-box">
        <div className="signup-header">
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Sign up to get started with your dashboard</p>
        </div>
        
        <button onClick={() => {Navigate('/App')}} className='close-btn'>×</button>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <div className="name-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type='text'
                className="form-input"
                value={firstName}
                placeholder='John'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type='text'
                className="form-input"
                value={lastName}
                placeholder='Doe'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type='email'
              className="form-input"
              value={email}
              placeholder='john.doe@example.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-input"
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                     <circle cx="12" cy="12" r="3" /> 
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type='checkbox'
              id='terms'
              className="checkbox-input"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor='terms' className="checkbox-label">
              I agree to the <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>
            </label>
          </div>

          <button className="btn btn-primary" onClick={handleSignup}>
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </div>
    </div>
  )
}

export default SignUp