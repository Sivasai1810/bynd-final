
import Works from "./assets/upload01.svg"
import Sharebynd from "./assets/share02.svg"
import Trackview from "./assets/track03.svg"
import Arrow from "./assets/arrow.png"
import Review from "./assets/qoutes.svg"
import Profile from "./assets/Profiles.svg"
import Correct from "./assets/corrects.svg"
import Button from "./component/button.jsx"
import Faaq from "./FAQ/faaq"
// import Footer from "./footer/footer.jsx"
import Footer  from "./footer/footer.jsx"
import './App.css'
import { useState, useEffect } from 'react'
import Navbar from './component/navbar.jsx'
import Mainsection from "./component/mainsection.jsx"
import Featuressection from "./component/features-section.jsx"
import Howitworks from "./component/howitworks.jsx"
import Testimonials from "./component/testimonials.jsx"
import Pricing from "./component/pricing.jsx"

function App() {
  return (
  <div>
    <Navbar />
    <Mainsection />
    <Featuressection />
    <Howitworks />
    <Testimonials />
    <Pricing />
 {/* 

<div className='testimonials-section'>
  <div className='testimonials-container'>
    <div className='testimonials-header'>
      <h2 className='testimonials-title'>
        What they <span className='highlight'>say</span>
      </h2>
      <p className='testimonials-subtitle'>
        Early praise from the Design Community
      </p>
    </div>
    
    <div className='testimonials-grid'>
      <div className='testimonial-card'>
        <div className='quote-icon'>
          <img src={Review} alt='Quote' />
        </div>
        <p className='testimonial-text'>
          "I can see which of my assignments were opened thanks to The BYND which in turn helps me in following up with the recruiting team."
        </p>
        <div className='testimonial-author'>
          <div className='author-avatar'>
            <img src={Profile} alt='Hitesh Yadav' />
          </div>
          <div className='author-info'>
            <h5 className='author-name'>Hitesh Yadav</h5>
            <p className='author-title'>Product Design Intern</p>
          </div>
        </div>
      </div>
      
      <div className='testimonial-card'>
        <div className='quote-icon'>
          <img src={Review} alt='Quote' />
        </div>
        <p className='testimonial-text'>
          "It's so discouraging to spend hours on a design assignment and then just hear nothing. With The BYND, at least I could track if someone checked my work."
        </p>
        <div className='testimonial-author'>
          <div className='author-avatar'>
            <img src={Profile} alt='Vandana Trivedi' />
          </div>
          <div className='author-info'>
            <h5 className='author-name'>Vandana Trivedi</h5>
            <p className='author-title'>Associate UI UX Designer</p>
          </div>
        </div>
      </div>
      
      <div className='testimonial-card'>
        <div className='quote-icon'>
          <img src={Review} alt='Quote' />
        </div>
        <p className='testimonial-text'>
          "With 1000s of designers applying, knowing exactly when your work is viewed is crucial. The BYND shows me when my assignment is opened—and it truly makes a difference."
        </p>
        <div className='testimonial-author'>
          <div className='author-avatar'>
            <img src={Profile} alt='Harrison Ray' />
          </div>
          <div className='author-info'>
            <h5 className='author-name'>Harrison Ray</h5>
            <p className='author-title'>Freelance Designer transitioning to full-time</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className='pricing-section'>
  <div className='pricing-container'>
    <div className='pricing-header'>
      <h2 className='pricing-title'>
        Choose the <span className='highlight'>plan</span> that's right for you
      </h2>
    </div>
    
    <div className='pricing-grid'>
      <div className='pricing-card free-tier'>
        <div className='pricing-card-header'>
          <h3 className='plan-name'>Free Tier</h3>
          <div className='plan-price'>
            <span className='price-amount'>$0</span>
            <span className='price-period'>per month</span>
          </div>
        </div>
        <div className='plan-features'>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='assignment-text'>3 Assignment Submissions</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='feature-text'>View Status (Viewed / Not Viewed)</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='feature-text'>Secure Link Sharing</span>
          </div>
        </div>
      </div>
      
      <div className='pricing-card pro-tier'>
        <div className='best-value-badge'>Best value</div>
        <div className='pricing-card-header'>
          <h3 className='plan-name'>Pro Tier</h3>
          <div className='plan-price'>
            <span className='price-amount'>$12</span>
            <span className='price-period'>per month</span>
          </div>
        </div>
        <div className='plan-features'>
          <div className='feature-item'>
            <span className='feature-text'>Everything in Free, Plus</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span  className='feature-text'>Unlimited submissions</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='feature-text'>Instant notifications when design is viewed</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='feature-text'>First & last viewed timestamps</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='feature-text'>Assignment metrics dashboard</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='feature-text'>Engagement score</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='feature-text'>Views over time (Graph)</span>
          </div>
          <div className='feature-item'>
            <img src={Correct} alt='Check' className='feature-icon' />
            <span className='feature-text'>Smart tracking links</span>
          </div>
          <div className='feature-item'>
            <span className='feature-textss'>No credit card required</span>
          </div>
        </div>
      </div>
    </div>
    <div className='pricing-footer'>
      <p className='billing-info'>Billed monthly. Cancel anytime.</p>
      <button className='pricing-cta-button'>
        Start tracking for free <img src={Arrow} alt='Arrow' />
      </button>
    </div>
  </div>
</div>
 update the total css write responsive for 0-468 and 468-770 and 770-1200 ans 1200 to maxx i need design like below image 
<Footer />  */}
<Faaq />
<Footer /> 
</div>
  )
}
export default App



