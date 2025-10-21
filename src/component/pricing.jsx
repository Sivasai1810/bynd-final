import React from 'react'
import Arrow from "../assets/arrow.png"
import Correct from "../assets/corrects.svg"
import './pricing.css'
const Pricing = () => {
  return (
    <div>
      <div id='pricing' className='pricing-section'>
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
    </div>
  )
}

export default Pricing
