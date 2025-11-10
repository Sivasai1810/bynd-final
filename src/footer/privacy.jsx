import React from 'react';
import './TermsOfUse.css';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
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
          <h1>Privacy <span className='highlight'>Policy</span></h1>
          <p className='subtitle'>How we collect, use, and protect your information</p>

          <div className='terms-content'>
            <div className='terms-box'>
              <h2>Privacy Policy</h2>
              <h2>Effective Date: <span style={{color:'gray'}}>August 19, 2025</span></h2>

              <p style={{fontSize:13}}>This Privacy Policy describes how BYND ("BYND," "we," "our," or "us") collects, uses, and protects your personal information when you use our website at <a href="https://getbynd.com">getbynd.com</a> and related services (collectively, the "Services").</p>

              <p>By using our Services, you agree to the collection and use of information in accordance with this Privacy Policy.</p>

              <h3>1. Information We Collect</h3>
              <p><strong>a. Personal Information You Provide</strong></p>
              <ul>
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, and password (or authenticate via Google Sign-In).</li>
                <li><strong>Payment Information:</strong> Billing details (processed securely through Stripe and Razorpay).</li>
                <li><strong>User Content:</strong> Design files, Figma links, PDFs, PNGs, JPEGs, company names, position details, and any other content you upload or share.</li>
                <li><strong>Communications:</strong> Messages or feedback you send to us.</li>
              </ul>

              <p><strong>b. Automatically Collected Information</strong></p>
              <ul>
                <li><strong>Usage Data:</strong> IP address, browser type, device information, pages visited, time spent, and referring URLs.</li>
                <li><strong>Cookies & Tracking:</strong> We use cookies and similar technologies to enhance user experience and analyze usage patterns.</li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <ul>
                <li>To provide, maintain, and improve the Services</li>
                <li>To process payments and manage subscriptions</li>
                <li>To track assignment views and engagement metrics</li>
                <li>To send notifications (email or SMS, if opted-in)</li>
                <li>To respond to support requests and communications</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h3>3. How We Share Your Information</h3>
              <p>We do not sell your personal information. We may share it in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate (e.g., Stripe, Razorpay, hosting providers, analytics tools).</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information.</li>
              </ul>

              <h3>4. Data Retention</h3>
              <ul>
                <li>We retain your personal information as long as your account is active or as needed to provide Services.</li>
                <li>After account deletion, we may retain certain data for legal, accounting, or security purposes.</li>
              </ul>

              <h3>5. Your Rights & Choices</h3>
              <p>Depending on your location, you may have the following rights:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data.</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information.</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data.</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails or SMS by following the instructions in the message.</li>
                <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format.</li>
              </ul>
              <p>To exercise these rights, contact us at <a href="mailto:byndhq@gmail.com">byndhq@gmail.com</a>.</p>

              <h3>6. Cookies & Tracking Technologies</h3>
              <ul>
                <li>We use cookies to remember your preferences, analyze site traffic, and improve functionality.</li>
                <li>You can control cookies through your browser settings, but disabling them may affect certain features.</li>
              </ul>

              <h3>7. Third-Party Services</h3>
              <ul>
                <li>Our Services may integrate with third-party platforms (e.g., Figma, Google, Stripe, Razorpay).</li>
                <li>These third parties have their own privacy policies, and we are not responsible for their practices.</li>
              </ul>

              <h3>8. Data Security</h3>
              <ul>
                <li>We implement industry-standard security measures to protect your information.</li>
                <li>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</li>
              </ul>

              <h3>9. Children's Privacy</h3>
              <ul>
                <li>BYND is not intended for users under the age of 18.</li>
                <li>We do not knowingly collect personal information from children. If you believe a child has provided us with data, contact us immediately.</li>
              </ul>

              <h3>10. International Data Transfers</h3>
              <ul>
                <li>Your information may be stored and processed in servers located outside your country.</li>
                <li>By using BYND, you consent to the transfer of your data to India and other jurisdictions where we operate.</li>
              </ul>

              <h3>11. Changes to This Privacy Policy</h3>
              <ul>
                <li>We may update this Privacy Policy from time to time.</li>
                <li>Users will be notified by email before significant changes take effect.</li>
                <li>Continued use of the Services after changes constitutes acceptance of the updated policy.</li>
              </ul>

              <h3>12. Contact Us</h3>
              <p>If you have questions or concerns about this Privacy Policy, contact us:</p>
              <p><strong>BYND HQ</strong></p>
              <ul>
                <li>Email: <a href="mailto:byndhq@gmail.com">byndhq@gmail.com</a></li>
                <li>Website: <a href="https://getbynd.com">getbynd.com</a></li>
              </ul>

              <h3>By using BYND, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;