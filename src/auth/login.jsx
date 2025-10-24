/*import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Signup from './sign.jsx'
import './login.css' 

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

const Login = () => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
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

  const handlesign = async () => {
    Navigate('/signup')
  }

  const handlelogin = async () => {
    if (!email) {
      showToast("Please enter the email to login", "warning");
      return
    } else if (!password) {
      showToast("Please enter the password to login", "warning");
      return
    }
    try {
      //https://bynd-backend.onrender.com
      const res = await axios.post("https://bynd-backend.onrender.com/auth/login", {
        user_email: email,
        user_password: password
      }, { withCredentials: true })
      
      setEmail("")
      setPassword("")
      
      if (res.data.success == true) {
        showToast(res.data.message, "success");
        setTimeout(() => {
          Navigate('/Dashboard')
        }, 1000);
      } else {
        showToast(res.data.message, "error");
      }
    } catch (err) {
      console.log("unable to hit the login", err)
      showToast("Login failed. Please try again.", "error");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-container">
      {/* Toast Notifications 
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <div className="login-box">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Login to access your dashboard</p>
        </div>
        <button className='close-btn' onClick={()=>{Navigate('/App')}}>×</button>
        
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type='email'
              className="form-input"
              value={email}
              placeholder='Enter your email'
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
                {!showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={handlelogin}>
              Login
            </button>
            <button className="btn btn-secondary" onClick={handlesign}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase'
import './login.css'

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    const interval = setInterval(() => {
      setProgress((p) => Math.max(p - (100 / (duration / 50)), 0));
    }, 50);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [duration, onClose]);

  const colors = {
    success: { bg: '#10b981', border: '#059669' },
    error: { bg: '#ef4444', border: '#dc2626' },
    warning: { bg: '#f59e0b', border: '#d97706' },
    info: { bg: '#3b82f6', border: '#2563eb' }
  }[type] || { bg: '#10b981', border: '#059669' };

  return (
    <div style={{
      position: 'fixed', top: '20px', right: '20px',
      backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      minWidth: '300px', maxWidth: '400px', zIndex: 9999, overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: colors.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
          </div>
          <span>{message}</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '20px' }}>×</button>
      </div>
      <div style={{ height: '3px', backgroundColor: colors.border, width: `${progress}%` }} />
    </div>
  );
};

const Login = () => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [toasts, setToasts] = useState([])

  const showToast = (msg, type = 'success') => setToasts((p) => [...p, { id: Date.now(), msg, type }])
  const removeToast = (id) => setToasts((p) => p.filter((t) => t.id !== id))

  // Check for OAuth redirect on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // User is logged in (likely from OAuth redirect)
        Navigate('/dashboard')
      }
    }
    checkUser()
  }, [Navigate])

  const handlesign = () => Navigate('/signup')

  const handlelogin = async () => {
    if (!email) return showToast("Please enter your email", "warning")
    if (!password) return showToast("Please enter your password", "warning")

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      showToast(error.message, "error")
    } else {
      showToast("Login successful!", "success")
      setTimeout(() => Navigate('/dashboard'), 1000)
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) {
      showToast(error.message, "error")
    }
    // Don't navigate here - the OAuth will redirect automatically
  }

  return (
    <div className="login-container">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
      <div className="login-box">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Login to access your dashboard</p>
        </div>
        <button className='close-btn' onClick={() => Navigate('/App')}>×</button>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Email</label>
            <input type='email' className="form-input" value={email}
              placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input type={showPassword ? 'text' : 'password'} className="form-input"
                placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={handlelogin}>Login</button>
            <button className="btn btn-secondary" onClick={handlesign}>Sign Up</button>
            <button className="btn btn-google" onClick={handleGoogleLogin}>Sign in with Google</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login