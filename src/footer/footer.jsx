import React, { useState } from 'react';
import Bynd from "../assets/byndlogo.svg"

const Footer = () => {

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleTermsClick = () => {
    setShowTerms(true);
    setShowPrivacy(false);
  };

  const handlePrivacyClick = () => {
    setShowPrivacy(true);
    setShowTerms(false);
  };

  const handleCloseTerms = () => {
    setShowTerms(false);
  };

  const handleClosePrivacy = () => {
    setShowPrivacy(false);
  };

  return (
    <div>
      <div id='contact' className='footers'>
        <div className='title'>
            <img src={Bynd} alt='BYND'></img>
          <p>byndhq@gmail.com</p>
        </div>
        <div className='subpart'>
          <p>BYND is in its early stages. We'd love your feedback or suggestions — email us at byndhq@gmail.com or reach out to the founder directly on <a href="https://x.com/uxayaan">X</a></p>
        </div>
        <div className='footer'>
          <p onClick={handleTermsClick} style={{ cursor: 'pointer'}}>Terms of use</p>
          <p onClick={handlePrivacyClick} style={{ cursor: 'pointer'}}>Privacy and Cookies policy</p>
          <p>Contact</p>
          <p>© 2025 BYND. All rights reserved</p>
        </div>
      </div>

      {showTerms && (
        <div className='modal-overlay' onClick={handleCloseTerms}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='close-btn' onClick={handleCloseTerms}>×</button>
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
                    <li>You may upload, post, or otherwise provide content on BYND (“User Content”).</li>
                    <li>You retain ownership of your User Content, but grant BYND a worldwide, non-exclusive, royalty-free license to use, host, display, and distribute it as necessary to operate the Services.</li>
                    <li>BYND is not responsible for User Content and reserves the right to remove it for violations.</li>
                    <li>Added that uploads can be Embed Links (Figma, etc.) or Universal Formats (PDF, PNG, JPEG).</li>
                    <li>Added a note that BYND doesn’t validate accuracy, order, or completeness of exported files — the user is responsible.</li>
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
    <li>
We do not host third-party advertisements on BYND at this time.</li>
  </ul>
  <h3>9. Copyright & DMCA</h3>
  <ul>
    <li>If you believe your copyright has been infringed, contact us at *[byndhq@gmail.com](mailto:byndhq@gmail.com)* with all necessary details.</li>
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
    <li>Email: [byndhq@gmail.com]</li>
    <li>Website: [getbynd.com]</li>
  </ul>
<h3>These disclaimers are fundamental to your use of BYND, and by using the Services, you agree and accept these limitations.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
{/*:


We may update these Terms from time to time. Users will be notified by email before changes take effect.

16. Contact Us

BYND HQ
Email: [byndhq@gmail.com](mailto:byndhq@gmail.com)
Website: [getbynd.com](https://getbynd.com)

These disclaimers are fundamental to your use of BYND, and by using the Services, you agree and accept these limitations.

 */}
      {showPrivacy && (
        <div className='modal-overlay' onClick={handleClosePrivacy}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='close-btn' onClick={handleClosePrivacy}>×</button>
            <div className='terms-container'>
              <h1>Privacy and  <span className='highlight'> cookies </span> policy</h1>
              <p className='subtitle'>Our approach to user privacy, personal data, and cookies</p>

              <div className='terms-content'>
                <div className='terms-box'>
                  <h2>Privacy and Cookies Policy</h2>
                  <p>How BYND handles your data and protects your privacy.</p>
                  <h2> Last Updated: <span style={{color:'gray'}}>August 19, 2025</span></h2>

                  <h3>1. Introduction</h3>
                  <p>BYND ("we," "our," or "us") values your privacy. This Privacy and Cookies Policy explains how we collect, use, store, and protect your information when you use our platform ("Services"). By accessing or using BYND, you agree to this Policy. If you do not agree, please discontinue use.</p>

                  <h3>2. Information We Collect</h3>
                  <p>We may collect the following categories of information:</p>
                  <ul>
                    <li>Account Information – Name, email address, password, and profile details you provide.</li>
                    <li>Assignment Data – Links (e.g., Figma embed links) and files you upload in universal formats (PDF, PNG, JPEG).</li>
                    <li>Communication Data – Notifications, support inquiries, or feedback you provide.</li>
                    <li>Payment Data – If you subscribe to BYND Pro, billing and payment details are processed securely via third-party payment providers.</li>
                    <li>Cookies & Tracking Data – To improve user experience, monitor activity, and measure analytics (see Section 7).</li>
                  </ul>

                  <h3>3. How We Use Your Information</h3>
                  <p>We use collected data to:</p>
                  <ul>
                    <li>Provide, operate, and maintain BYND's Services.</li>
                    <li>Track assignment engagement (views, insights, metrics).</li>
                    <li>Deliver notifications and follow-up reminders.</li>
                    <li>Manage billing, subscriptions, and account upgrades.</li>
                    <li>Improve platform performance and develop new features.</li>
                    <li>Ensure legal compliance and prevent misuse of BYND.</li>
                    <li>Communicate updates, service alerts, or policy changes.</li>
                  </ul>

                  <h3>4. Data Sharing & Disclosure</h3>
                  <p>We do not sell your personal data. However, we may share information:</p>
                  <ul>
                    <li>With trusted service providers (e.g., hosting, payment, analytics).</li>
                    <li>With third-party platforms (e.g., Figma) to render previews when you share embed links. If required by law or legal process</li>
                    <li>To enforce our Terms of Use and protect BYND against misuse.</li>
                    <li>During a merger, acquisition, or transfer of assets.</li>
                  </ul>

                  <h3>5. Data Retention</h3>
                  <p>We retain personal data only as long as necessary to provide our Services or comply with legal obligations. Assignments and engagement data may be deleted upon user request.</p>

                  <h3>6. Security</h3>
                  <p>We take reasonable organizational, technical, and administrative measures to protect your data from unauthorized access, loss, or misuse. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

                  <h3>7. Cookies and Tracking Technologies</h3>
                  <p>BYND uses cookies and similar technologies to:</p>
                  <ul>
                    <li>Authenticate users and manage sessions.</li>
                    <li>Analyze assignment engagement and site performance.</li>
                    <li>Personalize your experience.</li>
                    <li>Enable core platform features (e.g., analytics dashboards).</li>
                    <li>You can control cookies through your browser settings. Disabling cookies may impact certain features of BYND.</li>
                  </ul>

                  <h3>8. User Rights</h3>
                  <p>Depending on your jurisdiction, you may have rights to:</p>
                  <ul>
                    <li>Access, update, or delete your data.</li>
                    <li>Withdraw consent for processing.</li>
                    <li>Object to data collection for marketing or analytics.</li>
                    <li>Request a copy of your personal information.</li>
                    <li>To exercise these rights, contact us at [byndhq@gmail.com].</li>
                  </ul>

                  <h3>9. International Data Transfers</h3>
                  <p>Your data may be stored or processed outside your home country. We ensure adequate protections when transferring data internationally.</p>

                  <h3>10. Third-Party Services</h3>
                  <p>BYND may integrate with third-party tools (e.g., analytics, hosting, payment processors). When you share embed links (e.g., from Figma), your data may also be subject to those third parties' privacy policies. We are not responsible for their practices.</p>

                  <h3>11. Children's Privacy</h3>
                  <p>BYND is not intended for individuals under the age of 16. We do not knowingly collect personal data from children.</p>

                  <h3>12. Policy Updates</h3>
                  <p>We may update this Policy from time to time. Changes will be posted with a revised "Last Updated" date. Continued use of BYND after updates constitutes acceptance of the revised Policy.</p>

                  <h3>13. Contact Us</h3>
                  <p>For questions about this Privacy and Cookies Policy, please contact:📩 [byndhq@gmail.com]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
  
export default Footer