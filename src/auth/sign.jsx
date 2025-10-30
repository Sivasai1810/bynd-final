
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
          <span style={{ fontSize: '14px', color: '#374151' }}>{message}</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '20px', cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ height: '3px', backgroundColor: colors.border, width: `${progress}%`, transition: 'width 50ms linear' }} />
    </div>
  );
};

const Signup = () => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [toasts, setToasts] = useState([])
  
  const features = [
    "Track if recruiters view your design assignment",
    "Get notified instantly when your Figma link is opened",
    "Know when to follow up with Pro analytics",
    "Unlock detailed insights: views, time spent, last activity",
    "See how long they looked. See how often they returned"
  ];

  const showToast = (msg, type = 'success') => setToasts((p) => [...p, { id: Date.now(), msg, type }])
  const removeToast = (id) => setToasts((p) => p.filter((t) => t.id !== id))

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        Navigate('/dashboard')
      }
    }
    checkUser()
  }, [Navigate])

  const handlesignin = () => Navigate('/login')

  const handlesignup = async () => {
    if (!email) return showToast("Please enter your email", "warning")
    if (!password) return showToast("Please create a password", "warning")
    if (!agreeToTerms) return showToast("Please agree to the terms & conditions", "warning")

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })
    
    if (error) {
      showToast(error.message, "error")
    } else {
      showToast("Sign up successful!", "success")
      setTimeout(() => Navigate('/welcome'), 1500)
    }
  }

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) showToast(error.message, "error")
  }

  return (
    <div className="modern-login-container">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
      
      <div className="modern-login-content">
        {/* Left Side - Signup Form */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <div className="login-header-modern">
              <h1 className="login-title-modern">Sign up</h1>
              <p className="login-subtitle-modern">Set up your profile and start protecting your work today.</p>
            </div>

            <form className="modern-form" onSubmit={(e) => e.preventDefault()}>
              {/* Google Sign Up Button */}
              <button type="button" className="google-signin-btn" onClick={handleGoogleSignup}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                  <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>

              {/* Divider */}
               <div className="or-divider-container">
      <span className="or-divider-line"></span>
      <span className="or-divider-text">OR</span>
      <span className="or-divider-line"></span>
    </div>

              {/* Email Input */}
              <div className="form-group-modern">
                <label className="form-label-modern">Email</label>
                <input 
                  type='email' 
                  className="form-input-modern" 
                  value={email}
                  placeholder='example@gmail.com' 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <p className="form-hint">We'll send notifications to this email. You can update it anytime.</p>
              </div>

              {/* Password Input */}
              <div className="form-group-modern">
                <label className="form-label-modern">Password</label>
                <div className="password-wrapper-modern">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="form-input-modern"
                    placeholder='Create a password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-modern" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">I agree to the <a href="#" className="terms-link" style={{color: '#10b981', textDecoration: 'underline'}}>terms & conditions</a>.</span>
                </label>
              </div>

              {/* Sign Up Button */}
              <button type="button" className="signin-btn-modern" onClick={handlesignup}>
                Sign up
              </button>

              {/* Sign In Link */}
              <p className="signup-link-text">
                Already have an account? <button type="button" className="signup-link" onClick={handlesignin}>Sign in</button>
              </p>

              {/* Terms */}
              <p className="terms-text">
                By continuing, you agree to our <a href="#" className="terms-link">terms of use</a> and <a href="#" className="terms-link">privacy policy</a>.
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Feature Cards */}
        <div className='login-features-container'>
          <div className='login-features-box'>
            {features.map((feature, index) => (
              <div
                key={index}
                className="login-feature-card">
                <p className="login-feature-text">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup