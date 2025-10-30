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
// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { supabase } from './supabase'
// import './login.css'

// const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
//   const [progress, setProgress] = useState(100);

//   useEffect(() => {
//     const timer = setTimeout(onClose, duration);
//     const interval = setInterval(() => {
//       setProgress((p) => Math.max(p - (100 / (duration / 50)), 0));
//     }, 50);
//     return () => { clearTimeout(timer); clearInterval(interval); };
//   }, [duration, onClose]);

//   const colors = {
//     success: { bg: '#10b981', border: '#059669' },
//     error: { bg: '#ef4444', border: '#dc2626' },
//     warning: { bg: '#f59e0b', border: '#d97706' },
//     info: { bg: '#3b82f6', border: '#2563eb' }
//   }[type] || { bg: '#10b981', border: '#059669' };

//   return (
//     <div style={{
//       position: 'fixed', top: '20px', right: '20px',
//       backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//       minWidth: '300px', maxWidth: '400px', zIndex: 9999, overflow: 'hidden'
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: colors.bg,
//             display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <span style={{ color: 'white', fontWeight: 'bold' }}>{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
//           </div>
//           <span>{message}</span>
//         </div>
//         <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '20px' }}>×</button>
//       </div>
//       <div style={{ height: '3px', backgroundColor: colors.border, width: `${progress}%` }} />
//     </div>
//   );
// };

// const Login = () => {
//   const Navigate = useNavigate()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [toasts, setToasts] = useState([])

//   const showToast = (msg, type = 'success') => setToasts((p) => [...p, { id: Date.now(), msg, type }])
//   const removeToast = (id) => setToasts((p) => p.filter((t) => t.id !== id))

//   // Check for OAuth redirect on component mount
//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession()
//       if (session) {
//         // User is logged in (likely from OAuth redirect)
//         Navigate('/dashboard')
//       }
//     }
//     checkUser()
//   }, [Navigate])

//   const handlesign = () => Navigate('/signup')

//   const handlelogin = async () => {
//     if (!email) return showToast("Please enter your email", "warning")
//     if (!password) return showToast("Please enter your password", "warning")

//     const { data, error } = await supabase.auth.signInWithPassword({ email, password })
//     if (error) {
//       showToast(error.message, "error")
//     } else {
//       showToast("Login successful!", "success")
//       setTimeout(() => Navigate('/dashboard'), 1000)
//     }
//   }

//   const handleGoogleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: { 
//         redirectTo: `${window.location.origin}/dashboard`
//       }
//     })
//     if (error) {
//       showToast(error.message, "error")
//     }
//     // Don't navigate here - the OAuth will redirect automatically
//   }

//   return (
//     <div className="login-container">
//       {toasts.map((t) => (
//         <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
//       ))}
//       <div className="login-box">
//         <div className="login-header">
//           <h1 className="login-title">Welcome Back</h1>
//           <p className="login-subtitle">Login to access your dashboard</p>
//         </div>
//         <button className='close-btn' onClick={() => Navigate('/App')}>×</button>

//         <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//           <div className="form-group">
//             <label>Email</label>
//             <input type='email' className="form-input" value={email}
//               placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <div className="password-input-wrapper">
//               <input type={showPassword ? 'text' : 'password'} className="form-input"
//                 placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
//               <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>

//           <div className="button-group">
//             <button className="btn btn-primary" onClick={handlelogin}>Login</button>
//             <button className="btn btn-secondary" onClick={handlesign}>Sign Up</button>
//             <button className="btn btn-google" onClick={handleGoogleLogin}>Sign in with Google</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { supabase } from './supabase'
// import './login.css'

// const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
//   const [progress, setProgress] = useState(100);

//   useEffect(() => {
//     const timer = setTimeout(onClose, duration);
//     const interval = setInterval(() => {
//       setProgress((p) => Math.max(p - (100 / (duration / 50)), 0));
//     }, 50);
//     return () => { clearTimeout(timer); clearInterval(interval); };
//   }, [duration, onClose]);

//   const colors = {
//     success: { bg: '#10b981', border: '#059669' },
//     error: { bg: '#ef4444', border: '#dc2626' },
//     warning: { bg: '#f59e0b', border: '#d97706' },
//     info: { bg: '#3b82f6', border: '#2563eb' }
//   }[type] || { bg: '#10b981', border: '#059669' };

//   return (
//     <div style={{
//       position: 'fixed', top: '20px', right: '20px',
//       backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//       minWidth: '300px', maxWidth: '400px', zIndex: 9999, overflow: 'hidden'
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: colors.bg,
//             display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <span style={{ color: 'white', fontWeight: 'bold' }}>{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
//           </div>
//           <span>{message}</span>
//         </div>
//         <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '20px' }}>×</button>
//       </div>
//       <div style={{ height: '3px', backgroundColor: colors.border, width: `${progress}%` }} />
//     </div>
//   );
// };

// const Login = () => {
//   const Navigate = useNavigate()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [toasts, setToasts] = useState([])

//   const showToast = (msg, type = 'success') => setToasts((p) => [...p, { id: Date.now(), msg, type }])
//   const removeToast = (id) => setToasts((p) => p.filter((t) => t.id !== id))

//   // Check for OAuth redirect on component mount
//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession()
//       if (session) {
//         Navigate('/dashboard')
//       }
//     }
//     checkUser()
//   }, [Navigate])

//   const handlesign = () => Navigate('/signup')

//   const handlelogin = async () => {
//     if (!email) return showToast("Please enter your email", "warning")
//     if (!password) return showToast("Please enter your password", "warning")

//     const { data, error } = await supabase.auth.signInWithPassword({ email, password })
//     if (error) {
//       showToast(error.message, "error")
//     } else {
//       showToast("Login successful!", "success")
//       setTimeout(() => Navigate('/dashboard'), 1000)
//     }
//   }

//   const handleGoogleLogin = async () => {
//     const redirectUrl = import.meta.env.VITE_REDIRECT_URL || `${window.location.origin}/dashboard`

//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: { 
//         // redirectTo: 'https://bynd-final.vercel.app/ '
//          redirectTo: `${window.location.origin}/dashboard`
//         }
//     })
//     if (error) showToast(error.message, "error")
//   }

//   return (
//     <div className="login-container">
//       {toasts.map((t) => (
//         <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
//       ))}
//       <div className="login-box">
//         <div className="login-header">
//           <h1 className="login-title">Welcome Back</h1>
//           <p className="login-subtitle">Login to access your dashboard</p>
//         </div>
//         <button className='close-btn' onClick={() => Navigate('/App')}>×</button>

//         <form className="login-form" onSubmit={(e) => e.preventDefault()}>
//           <div className="form-group">
//             <label>Email</label>
//             <input type='email' className="form-input" value={email}
//               placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <div className="password-input-wrapper">
//               <input type={showPassword ? 'text' : 'password'} className="form-input"
//                 placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
//               <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>

//           <div className="button-group">
//             <button className="btn btn-primary" onClick={handlelogin}>Login</button>
//             <button className="btn btn-secondary" onClick={handlesign}>Sign Up</button>
//             <button className="btn btn-google" onClick={handleGoogleLogin}>Sign in with Google</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { supabase } from './supabase'
// import './login.css'

// const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
//   const [progress, setProgress] = useState(100);

//   useEffect(() => {
//     const timer = setTimeout(onClose, duration);
//     const interval = setInterval(() => {
//       setProgress((p) => Math.max(p - (100 / (duration / 50)), 0));
//     }, 50);
//     return () => { clearTimeout(timer); clearInterval(interval); };
//   }, [duration, onClose]);

//   const colors = {
//     success: { bg: '#10b981', border: '#059669' },
//     error: { bg: '#ef4444', border: '#dc2626' },
//     warning: { bg: '#f59e0b', border: '#d97706' },
//     info: { bg: '#3b82f6', border: '#2563eb' }
//   }[type] || { bg: '#10b981', border: '#059669' };

//   return (
//     <div style={{
//       position: 'fixed', top: '20px', right: '20px',
//       backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//       minWidth: '300px', maxWidth: '400px', zIndex: 9999, overflow: 'hidden'
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: colors.bg,
//             display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <span style={{ color: 'white', fontWeight: 'bold' }}>{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
//           </div>
//           <span style={{ fontSize: '14px', color: '#374151' }}>{message}</span>
//         </div>
//         <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '20px', cursor: 'pointer' }}>×</button>
//       </div>
//       <div style={{ height: '3px', backgroundColor: colors.border, width: `${progress}%`, transition: 'width 50ms linear' }} />
//     </div>
//   );
// };

// const Login = () => {
//   const Navigate = useNavigate()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [rememberMe, setRememberMe] = useState(false)
//   const [toasts, setToasts] = useState([])
  
//   const features = [
//     "Track if recruiters view your design assignment",
//     "Get notified instantly when your Figma link is opened",
//     "Know when to follow up with Pro analytics",
//     "Unlock detailed insights: views, time spent, last activity",
//     "See how long they looked. See how often they returned"
//   ];

//   const showToast = (msg, type = 'success') => setToasts((p) => [...p, { id: Date.now(), msg, type }])
//   const removeToast = (id) => setToasts((p) => p.filter((t) => t.id !== id))

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession()
//       if (session) {
//         Navigate('/dashboard')
//       }
//     }
//     checkUser()
//   }, [Navigate])

//   const handlesign = () => Navigate('/signup')

//   const handlelogin = async () => {
//     if (!email) return showToast("Please enter your email", "warning")
//     if (!password) return showToast("Please enter your password", "warning")

//     const { data, error } = await supabase.auth.signInWithPassword({ email, password })
//     if (error) {
//       showToast(error.message, "error")
//     } else {
//       showToast("Login successful!", "success")
//       setTimeout(() => Navigate('/dashboard'), 1000)
//     }
//   }

//   const handleGoogleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: { 
//         redirectTo: `${window.location.origin}/dashboard`
//       }
//     })
//     if (error) showToast(error.message, "error")
//   }

//   const handleForgotPassword = () => {
//     showToast("Password reset feature coming soon", "info")
//   }

//   return (
//     <div className="modern-login-container">
//       {toasts.map((t) => (
//         <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
//       ))}
      
//       <div className="modern-login-content">
//         {/* Left Side - Login Form */}
//         <div className="login-form-section">
//           <div className="login-form-wrapper">
//             <div className="login-header-modern">
//               <h1 className="login-title-modern">Sign in</h1>
//               <p className="login-subtitle-modern">Access your workspace and keep building your best work.</p>
//             </div>

//             <form className="modern-form" onSubmit={(e) => e.preventDefault()}>
//               {/* Google Sign In Button */}
//               <button type="button" className="google-signin-btn" onClick={handleGoogleLogin}>
//                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
//                   <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
//                   <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
//                   <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
//                 </svg>
//                 Sign in with Google
//               </button>

//               {/* Divider */}
//               <div className="divider">
//                 <span className="divider-line"></span>
//                 <span className="divider-text">OR</span>
//                 <span className="divider-line"></span>
//               </div>

//               {/* Email Input */}
//               <div className="form-group-modern">
//                 <label className="form-label-modern">Email</label>
//                 <input 
//                   type='email' 
//                   className="form-input-modern" 
//                   value={email}
//                   placeholder='example@gmail.com' 
//                   onChange={(e) => setEmail(e.target.value)} 
//                 />
//                 <p className="form-hint">We'll send notifications to this email, You can update it anytime.</p>
//               </div>

//               {/* Password Input */}
//               <div className="form-group-modern">
//                 <label className="form-label-modern">Password</label>
//                 <div className="password-wrapper-modern">
//                   <input 
//                     type={showPassword ? 'text' : 'password'} 
//                     className="form-input-modern"
//                     placeholder='Enter your password' 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                   />
//                   <button 
//                     type="button" 
//                     className="password-toggle-modern" 
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
//                         <line x1="1" y1="1" x2="23" y2="23"/>
//                       </svg>
//                     ) : (
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                         <circle cx="12" cy="12" r="3"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="form-options">
//                 <label className="checkbox-label">
//                   <input 
//                     type="checkbox" 
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="checkbox-input"
//                   />
//                   <span className="checkbox-text">Remember me</span>
//                 </label>
//                 <button type="button" className="forgot-password-link" onClick={handleForgotPassword}>
//                   Forgot Password?
//                 </button>
//               </div>

//               {/* Sign In Button */}
//               <button type="button" className="signin-btn-modern" onClick={handlelogin}>
//                 Sign in
//               </button>

//               {/* Sign Up Link */}
//               <p className="signup-link-text">
//                 Don't have an account? <button type="button" className="signup-link" onClick={handlesign}>Sign up</button>
//               </p>

//               {/* Terms */}
//               <p className="terms-text">
//                 By continuing, you agree to our <a href="#" className="terms-link">terms of use</a> and <a href="#" className="terms-link">privacy policy</a>.
//               </p>
//             </form>
//           </div>
//         </div>

//         {/* Right Side - Feature Cards */}
//         <div className='login-features-container'>
//           <div className='login-features-box'>
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="login-feature-card">
//                 <p className="login-feature-text">{feature}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
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

const Login = () => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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
    if (error) showToast(error.message, "error")
  }

  const handleForgotPassword = () => {
    showToast("Password reset feature coming soon", "info")
  }

  return (
    <div className="modern-login-container">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.msg} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
      
      <div className="modern-login-content">
        {/* Left Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <div className="login-header-modern">
              <h1 className="login-title-modern">Sign in</h1>
              <p className="login-subtitle-modern">Access your workspace and keep building your best work.</p>
            </div>

            <form className="modern-form" onSubmit={(e) => e.preventDefault()}>
              {/* Google Sign In Button */}
              <button type="button" className="google-signin-btn" onClick={handleGoogleLogin}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                  <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                </svg>
                Sign in with Google
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
                <p className="form-hint">We'll send notifications to this email, You can update it anytime.</p>
              </div>

              {/* Password Input */}
              <div className="form-group-modern">
                <label className="form-label-modern">Password</label>
                <div className="password-wrapper-modern">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="form-input-modern"
                    placeholder='Enter your password' 
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

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <button type="button" className="forgot-password-link" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button type="button" className="signin-btn-modern" onClick={handlelogin}>
                Sign in
              </button>

              {/* Sign Up Link */}
              <p className="signup-link-text">
                Don't have an account? <button type="button" className="signup-link" onClick={handlesign}>Sign up</button>
              </p>

              {/* Terms */}
              <p className="terms-text">
                By continuing, you agree to our <a href="#" className="terms-link">terms of use</a> and <a href="#" className="terms-link">privacy policy</a>.
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Feature Cards (Hidden on screens below 1025px) */}
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

export default Login