import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase'
import './welcome.css'

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  React.useEffect(() => {
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

const Welcome = () => {
  const Navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [dob, setDob] = useState("")
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

  const handleLetsGo = async () => {
    // Validation
    if (!fullName && !dob) {
      return showToast("Please fill in your name and date of birth", "warning")
    }
    if (!fullName) {
      return showToast("Please enter your full name", "warning")
    }
    if (!dob) {
      return showToast("Please enter your date of birth", "warning")
    }

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        showToast("Error getting user information", "error")
        return
      }

      // Update user metadata or profile table
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          full_name: fullName,
          date_of_birth: dob
        }
      })

      if (updateError) {
        showToast(updateError.message, "error")
      } else {
        showToast("Profile updated successfully!", "success")
        setTimeout(() => Navigate('/dashboard'), 1000)
      }
    } catch (err) {
      showToast("An error occurred. Please try again.", "error")
    }
  }

  return (
    <div className="modern-login-containers">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
      
      <div className="modern-login-contents">
        {/* Left Side - Welcome Form */}
        <div className="login-form-sections">
          <div className="login-form-wrappers">
            <div className="login-header-moderns">
              <h1 className="login-title-moderns">Welcome!</h1>
              <p className="login-subtitle-moderns">Tell us more about you</p>
            </div>

            <form className="modern-forms" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name Input */}
              <div className="form-group-moderns">
                <label className="form-label-moderns">Full name*</label>
                <input 
                  type='text' 
                  className="form-input-moderns" 
                  value={fullName}
                  placeholder='Muhammad Aman' 
                  onChange={(e) => setFullName(e.target.value)} 
                />
              </div>

              {/* Date of Birth Input */}
              <div className="form-group-moderns">
                <label className="form-label-moderns">Birthday*</label>
                <input 
                  type='date' 
                  className="form-input-modern"
                  placeholder='DD/MM/YYYY' 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                />
              </div>

              {/* Let's Go Button */}
              <button type="button" className="signin-btn-moderns" onClick={handleLetsGo}>
                Let's Go!
              </button>

              {/* Terms */}
              <p className="terms-texts">
                By continuing, you agree to our <a href="#" className="terms-link">terms of use</a> and <a href="#" className="terms-link">privacy policy</a>.
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Feature Cards */}
        <div className='container'>
          <div className='loginContainers'>
            {features.map((feature, index) => (
              <div
                key={index}
                className="loginCards">
                <p className="loginText">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome