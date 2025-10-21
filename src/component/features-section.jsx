import React from 'react'
import Visibility from "../assets/track.svg"
import Vector  from "../assets/Vector.svg"
import Engagement from "../assets/Engagements.svg"
import Timeline from "../assets/timelines.svg"
import Notification from "../assets/notification.svg"
import Archive from  "../assets/filearchive.svg"
import './features.css'
const Featuressection = () => {
  return (
    <div>
      <div id='features' className='features-section'>
  <div className='features-container'>
    <div className='features-header'>
      <h2 className='features-title'>
        Everything you <span className='highlight'>need</span>
      </h2>
      <p className='features-subtitle'>
        Track views, gain insights, and stay in control — effortlessly.
      </p>
    </div>
    
    <div className='features-grid'>
      <div className='feature-card'>
        <div className='feature-icon'>
          <img src={Visibility} alt='Track Views' />
        </div>
        <h3 className='feature-title'>Track Views</h3>
        <p className='feature-description'>
          Get real-time updates on whether your assignment has been viewed — and when.
        </p>
      </div>
      
      <div className='feature-card'>
        <div className='feature-icon'>
          <img src={Vector} alt='View Insights' />
        </div>
        <h3 className='feature-title'>View Insights</h3>
        <p className='feature-description'>
          Track how much time recruiters spend on your submission and how often they return.
        </p>
      </div>
      
      <div className='feature-card'>
        <div className='feature-icon'>
          <img src={Engagement} alt='Engagement Score' />
        </div>
        <h3 className='feature-title'>Engagement Score</h3>
        <p className='feature-description'>
          We calculate an engagement score so you know which companies are truly interested.
        </p>
      </div>
      
      <div className='feature-card'>
        <div className='feature-icon'>
          <img src={Timeline} alt='Timeline View' />
        </div>
        <h3 className='feature-title'>Timeline View</h3>
        <p className='feature-description'>
          A simple graph showing how recruiters engaged with your assignment over time.
        </p>
      </div>
      
      <div className='feature-card'>
        <div className='feature-icon'>
          <img src={Notification} alt='Real-time Notifications' />
        </div>
        <h3 className='feature-title'>Real-time Notifications</h3>
        <p className='feature-description'>
          Get email and in-app notifications when your work is viewed — no more guessing.
        </p>
      </div>
      
      <div className='feature-card'>
        <div className='feature-icon'>
          <img src={Archive} alt='Assignment Archive' />
        </div>
        <h3 className='feature-title'>Assignment Archive</h3>
        <p className='feature-description'>
          Keep all your design assignments organized, secure, and easily accessible in one place.
        </p>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Featuressection
