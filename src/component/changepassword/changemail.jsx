import React, { useState } from "react";
import { supabase } from "../../auth/supabase.js";
import "./ChangeEmailModal.css";

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: "#10b981",
    error: "#dc2626",
    warning: "#f59e0b",
    info: "#3b82f6"
  };

  const icon = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ"
  };

  return (
    <div 
      className="cem-toast-notification"
      style={{ backgroundColor: bgColor[type] }}
    >
      <span className="cem-toast-icon">{icon[type]}</span>
      <span className="cem-toast-message">{message}</span>
      <button 
        className="cem-toast-close"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

export default function ChangeEmailModal({ 
  currentEmail, 
  onClose, 
  onEmailChanged 
}) {
  console.log(" ChangeEmailModal Mounted with currentEmail:", currentEmail);

  const [step, setStep] = useState("email");
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    console.log(` [${type.toUpperCase()}] ${message}`);
    setToast({ message, type });
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Validation 1: Empty email
    if (!newEmail || !newEmail.trim()) {
      showToast("Please enter a new email.", "error");
      return;
    }

    // Validation 2: Same email
    if (newEmail.trim().toLowerCase() === currentEmail.toLowerCase()) {
      showToast("Please enter a different email.", "error");
      return;
    }

    // Validation 3: Email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail.trim())) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    setLoading(true);

    try {
      console.log(" Requesting email change with OTP to:", newEmail.trim());
      
      // Request email change - Supabase will send OTP code
      const { data, error } = await supabase.auth.updateUser(
        { email: newEmail.trim() },
        {
          emailRedirectTo: undefined // Disable email link, force OTP only
        }
      );

      console.log(" Auth response:", { data, error });

      if (error) {
        console.log(` Auth error: ${error.message}`);
        
        // Handle specific error cases
        if (error.message.includes("already") || error.message.includes("registered")) {
          showToast("This email is already registered.", "warning");
        } else if (error.message.includes("rate limit")) {
          showToast("Too many attempts. Please try again later.", "error");
        } else {
          showToast(error.message, "error");
        }
        
        setLoading(false);
        return;
      }

      console.log(" OTP sent successfully to:", newEmail);
      console.log(" User should receive a 6-digit code");
      
      showToast("Verification code sent to your new email!", "success");
      
      // Move to verification step
      console.log(" Moving to verification step");
      setStep("verification");
      setLoading(false);
      
    } catch (err) {
      console.error(" Error:", err);
      showToast(`An error occurred: ${err.message}`, "error");
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Validation: Empty code
    if (!verificationCode.trim()) {
      console.log(" Validation: Code is empty");
      showToast("Please enter the verification code.", "error");
      return;
    }

    // Validation: Code length
    if (verificationCode.length !== 6) {
      console.log(" Validation: Code must be 6 digits");
      showToast("Verification code must be 6 digits.", "error");
      return;
    }

    setLoading(true);

    try {
      console.log(" Verifying OTP with Supabase...");
      console.log("   Email:", newEmail.trim());
      console.log("   Token:", verificationCode);
      console.log("   Type: email_change");
      
      // Verify the OTP code
      const { data, error } = await supabase.auth.verifyOtp({
        email: newEmail.trim(),
        token: verificationCode,
        type: "email_change"
      });

      console.log(" Verification response:", { data, error });

      if (error) {
        console.log(" Verification error:", error.message);
        
        // Handle specific error cases
        if (error.message.includes("invalid") || error.message.includes("expired")) {
          showToast("Invalid or expired code. Please try again.", "error");
        } else if (error.message.includes("token") || error.message.includes("OTP")) {
          showToast("Incorrect verification code.", "error");
        } else {
          showToast(error.message, "error");
        }
        
        setLoading(false);
        return;
      }

      console.log(" Email verified successfully!");
      console.log(" Email updated in auth.users to:", newEmail);
      
      showToast("Email changed successfully!", "success");

      // Update parent component with new email
      if (onEmailChanged) {
        console.log(" Calling onEmailChanged with:", newEmail.trim());
        onEmailChanged(newEmail.trim());
      }

      // Close modal after short delay to show success message
      setTimeout(() => {
        console.log("🔚 Closing modal");
        onClose();
      }, 1500);

    } catch (err) {
      console.error(" Unexpected error:", err);
      showToast(`Error: ${err.message}`, "error");
      setLoading(false);
    }
  };

  const handleResendCode = async (e) => {
    e.stopPropagation();
    console.log("Resending verification code...");
    setLoading(true);

    try {
      console.log(" Calling updateUser again to resend OTP");
      
      const { error } = await supabase.auth.updateUser(
        { email: newEmail.trim() },
        {
          emailRedirectTo: undefined // Disable email link, force OTP only
        }
      );

      if (error) {
        console.log(" Resend error:", error.message);
        showToast(`Failed to resend: ${error.message}`, "error");
        setLoading(false);
        return;
      }

      console.log(" Verification code resent to:", newEmail);
      showToast("Verification code sent again!", "info");
      setVerificationCode(""); // Clear old code
      setLoading(false);
      
    } catch (err) {
      console.error(" Error:", err);
      showToast(`Error: ${err.message}`, "error");
      setLoading(false);
    }
  };

  const handleNotNow = (e) => {
    if (e) e.stopPropagation();
    console.log(" User cancelled email change");
    setNewEmail("");
    setVerificationCode("");
    setStep("email");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log(" Overlay clicked - closing modal");
      handleNotNow(e);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleBackToEmail = (e) => {
    e.stopPropagation();
    console.log("🔙 Going back to email step");
    setStep("email");
    setVerificationCode("");
  };

  return (
    <>
      {/* Toast Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="cem-modal-overlay" onClick={handleOverlayClick}>
        <div className="cem-change-email-modal" onClick={handleModalClick}>
          
          {/* ==================== STEP 1: Email Input ==================== */}
          {step === "email" && (
            <>
              <div className="cem-modal-header">
                <h2 className="cem-modal-title">Change your email ID</h2>
                <button 
                  className="cem-modal-close" 
                  onClick={handleNotNow}
                  type="button"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleEmailUpdate} className="cem-modal-form">
                <p className="cem-modal-subtext">
                  We'll send a verification code to your new email address.
                </p>

                <div className="cem-form-group">
                  <label className="cem-modal-label" htmlFor="cem-current-email">
                    Current email ID
                  </label>
                  <input
                    id="cem-current-email"
                    type="email"
                    value={currentEmail}
                    disabled
                    className="cem-modal-input cem-disabled-input"
                    readOnly
                  />
                </div>

                <div className="cem-form-group">
                  <label className="cem-modal-label" htmlFor="cem-new-email">
                    New email ID
                  </label>
                  <input
                    id="cem-new-email"
                    type="email"
                    placeholder="newemail@example.com"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      console.log("📝 Email input changed:", e.target.value);
                    }}
                    className="cem-modal-input"
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <div className="cem-modal-buttons">
                  <button 
                    type="button"
                    className="cem-modal-cancel" 
                    onClick={handleNotNow}
                    disabled={loading}
                  >
                    Not now
                  </button>

                  <button
                    type="submit"
                    className="cem-modal-update"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Code"}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ==================== STEP 2: Verification ==================== */}
          {step === "verification" && (
            <>
              <div className="cem-modal-header">
                <h2 className="cem-modal-title">Verify your email</h2>
                <button 
                  className="cem-modal-close" 
                  onClick={handleNotNow}
                  type="button"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleVerifyEmail} className="cem-modal-form">
                <p className="cem-modal-subtext">
                  Enter the 6-digit code sent to <strong>{newEmail}</strong>
                </p>

                <div className="cem-form-group">
                  <label className="cem-modal-label" htmlFor="cem-verification-code">
                    Verification Code
                  </label>
                  <input
                    id="cem-verification-code"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setVerificationCode(val);
                      console.log("Code input changed:", val);
                    }}
                    className="cem-modal-input cem-code-input"
                    disabled={loading}
                    autoFocus
                    maxLength="6"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <p className="cem-code-hint">Check your email (including spam folder)</p>
                </div>

                <div className="cem-modal-buttons">
                  <button 
                    type="button"
                    className="cem-modal-cancel" 
                    onClick={handleBackToEmail}
                    disabled={loading}
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="cem-modal-update"
                    disabled={loading || verificationCode.length !== 6}
                  >
                    {loading ? "Verifying..." : "Verify Email"}
                  </button>
                </div>

                <div className="cem-resend-section">
                  <p className="cem-resend-text">Didn't receive the code?</p>
                  <button
                    type="button"
                    className="cem-resend-button"
                    onClick={handleResendCode}
                    disabled={loading}
                  >
                    Resend code
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}