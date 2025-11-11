// import React from 'react';
// import './TermsOfUse.css';

// const TermsOfUse = () => {
//   return (
//     <div className="terms-container">
//       <div className="terms-header">
//         <h1 className="terms-main-title">
//           Terms of <span className="highlight">use</span>
//         </h1>
//         <p className="terms-subtitle">Guidelines and rules for using BYND's services</p>
//       </div>

//       <div className="terms-content">
//         <h2 className="content-title">Terms of Use</h2>

//         <div className="content-section">
//           <p className="effective-date">
//             <strong>Effective Date:</strong> August 14, 2025
//           </p>
//         </div>

//         <div className="content-section">
//           <p>
//             These Terms of Use ("Terms") govern your use of BYND ("BYND," "we," "our," or "us"), including our website at{' '}
//             <a href="https://getbynd.com" className="link">getbynd.com</a> ("Website") and any related services, software, and applications (collectively, the "Services").
//           </p>
//         </div>

//         <div className="content-section">
//           <p>
//             By accessing or using our Services, you agree to be bound by these Terms and our{' '}
//             <a href="#" className="link">Privacy Policy</a>. If you do not agree, do not use the Services.
//           </p>
//         </div>

//         <div className="content-section">
//           <h3 className="section-heading">1. Eligibility</h3>
//           <p>
//             You must be at least *18 years old* to create an account. If you are under 18, you may only use BYND under the supervision of a parent or legal guardian who agrees to be bound by these Terms.
//           </p>
//         </div>

//         <div className="content-section">
//           <h3 className="section-heading">2. Account Registration</h3>
//           <ul className="content-list">
//             <li>You may be required to create an account to access certain features.</li>
//             <li>You agree to provide accurate, complete, and current information.</li>
//             <li>You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</li>
//             <li>You may register using *email/password* or via *Google Sign-In*.</li>
//           </ul>
//         </div>

//         <div className="content-section">
//           <h3 className="section-heading">3. Subscription & Payments</h3>
//           <ul className="content-list">
//             <li>BYND operates on a subscription-based model with monthly or annual renewal.</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsOfUse;
import React from 'react';
import './TermsOfUse.css';

const TermsOfUseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-btn' onClick={onClose}>×</button>
        <div className='terms-container'>
          <h1>Terms of <span className='highlight'>use</span></h1>
          <p className='subtitle'>Guidelines and rules for using BYND's services</p>

          <div className='terms-content'>
            <div className='terms-box'>
              <h2>Terms of Use</h2>
              <h2>Effective Date: <span style={{color:'gray'}}>August 19, 2025</span></h2>

              <p style={{fontSize:13}}>These Terms of Use ("Terms") govern your use of BYND ("BYND," "we," "our," or "us"), including our website at <a href="https://getbynd.com">getbynd.com</a> ("Website") and any related services, software, and applications (collectively, the "Services").</p>

              <p>By accessing or using our Services, you agree to be bound by these Terms and our <span>Privacy Policy.</span> If you do not agree, do not use the Services.</p>

              <h3>1. Eligibility</h3>
              <p>You must be at least *18 years old* to create an account. If you are under 18, you may only use BYND under the supervision of a parent or legal guardian who agrees to be bound by these Terms.</p>

              <h3>2. Account Registration</h3>
              <ul>
                <li>You may be required to create an account to access certain features.</li>
                <li>You agree to provide accurate, complete, and current information.</li>
                <li>You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</li>
                <li>You may register using email/password or via Google Sign-In.</li>
              </ul>

              <h3>3. Subscription & Payments</h3>
              <ul>
                <li>BYND operates on a subscription-based model with monthly or annual renewal.</li>
                <li>Free trials may be offered for 14 days; at the end of the trial, your chosen payment method will be charged unless you cancel.</li>
                <li>Payments are processed via Stripe (for global payments) and Razorpay (for Indian payments). Supported cards include Visa, Mastercard, American Express, Discover, and others as provided by these processors.</li>
                <li>We currently accept payments in Indian Rupees (INR) and US Dollars (USD).</li>
                <li>No refunds are offered except as required by applicable law.</li>
                <li>You may cancel your subscription by logging into your account or contacting customer support.</li>
              </ul>

              <h3>4. Prohibited Activities</h3>
              <ul>
                <li>Use the Services for any unlawful purpose.</li>
                <li>Advertise or offer to sell goods/services through the platform without permission.</li>
                <li>Sell or transfer your account.</li>
                <li>Post harmful, abusive, defamatory, or infringing content.</li>
                <li>Attempt to gain unauthorized access to BYND systems.</li>
              </ul>

              <h3>5. User Content</h3>
              <ul>
                <li>You may upload, post, or otherwise provide content on BYND ("User Content").</li>
                <li>You retain ownership of your User Content, but grant BYND a worldwide, non-exclusive, royalty-free license to use, host, display, and distribute it as necessary to operate the Services.</li>
                <li>BYND is not responsible for User Content and reserves the right to remove it for violations.</li>
                <li>Added that uploads can be Embed Links (Figma, etc.) or Universal Formats (PDF, PNG, JPEG).</li>
                <li>Added a note that BYND doesn't validate accuracy, order, or completeness of exported files — the user is responsible.</li>
              </ul>

              <h3>6. Service Limitations & Disclaimers</h3>
              <ul>
                <li>BYND provides tools to help you manage and track assignment submissions. However, you acknowledge and agree that:</li>
                <li>BYND provides view tracking (e.g., if your assignment was seen), engagement metrics (time spent, number of views), and a trackable submission experience via your dashboard.</li>
                <li>BYND does not guarantee that analytics will be 100% accurate at all times.</li>
                <li>BYND does not prevent recipients from copying, screenshotting, downloading, or otherwise retaining your submissions.</li>
                <li>BYND does not offer legal protection, validate originality, or enforce intellectual property rights.</li>
                <li>BYND is not responsible for disputes between you and recruiters, employers, or any third parties.</li>
                <li>Added that analytics may not be 100% accurate.</li>
                <li>Added that embed previews depend on third-party platforms (like Figma).</li>
                <li>Added that uploaded files may not render exactly the same on every browser/device.</li>
              </ul>

              <h3>7. Third-Party Links & Services</h3>
              <ul>
                <li>BYND may link to third-party websites. We are not responsible for their content, policies, or services.</li>
              </ul>

              <h3>8. No Third-Party Ads</h3>
              <ul>
                <li>We do not host third-party advertisements on BYND at this time.</li>
              </ul>

              <h3>9. Copyright & DMCA</h3>
              <ul>
                <li>If you believe your copyright has been infringed, contact us at *<a href="mailto:byndhq@gmail.com">byndhq@gmail.com</a>* with all necessary details.</li>
              </ul>

              <h3>10. SMS & Notifications</h3>
              <ul>
                <li>If you opt into receiving SMS messages from BYND:</li>
                <li>Messages may include account updates, billing notices, or promotional offers.</li>
                <li>You may opt out by replying STOP.</li>
                <li>Message frequency may vary.</li>
              </ul>

              <h3>11. Limitation of Liability</h3>
              <ul>
                <li>To the fullest extent permitted by law:</li>
                <li>Our liability is limited to the amount you paid us in the 12 months prior to the claim.</li>
                <li>We are not liable for indirect, incidental, special, or consequential damages</li>
              </ul>

              <h3>12. Limitation Period</h3>
              <ul>
                <li>Any claim against BYND must be brought within one (1) year after the cause of action arose.</li>
              </ul>

              <h3>13. Dispute Resolution</h3>
              <ul>
                <li>Disputes will first be resolved through informal negotiations for 30 days.</li>
                <li>If unresolved, disputes will be settled by binding arbitration in Bengaluru, India, in English, with one arbitrator, under the Arbitration and Conciliation Act, 1996.</li>
              </ul>

              <h3>14. Governing Law</h3>
              <ul>
                <li>These Terms are governed by the laws of India, without regard to conflict of laws principles.</li>
              </ul>

              <h3>15. Changes to These Terms</h3>
              <ul>
                <li>We may update these Terms from time to time. Users will be notified by email before changes take effect.</li>
              </ul>

              <h3>16. Contact Us</h3>
              <p>BYND HQ</p>
              <ul>
                <li>Email: <a href="mailto:byndhq@gmail.com">byndhq@gmail.com</a></li>
                <li>Website: <a href="https://getbynd.com">getbynd.com</a></li>
              </ul>

              <h3>These disclaimers are fundamental to your use of BYND, and by using the Services, you agree and accept these limitations.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseModal;