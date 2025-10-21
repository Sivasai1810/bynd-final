import React from 'react'
import Works from "../assets/upload01.svg"
import Sharebynd from "../assets/share02.svg"
import Trackview from "../assets/track03.svg"
import Arrow from "../assets/arrow.png"
import './howitworks.css'
const Howitworks = () => {
  return (
    <div>
      <div  id ='how-it-works'className='how-it-works-section'>
  <div className='how-it-works-container'>
    <div className='how-it-works-header'>
      <h2 className='how-it-works-title'>
        How it <span className='highlight'>works</span>
      </h2>
      <p className='how-it-works-subtitle'>
        Just 3 easy steps to track your design assignments
      </p>
    </div>
    
    <div className='steps-grid'>
      <div className='step-card'>
        <div className='step-number'>01</div>
        <h3 className='step-title'>UPLOAD YOUR ASSIGNMENT</h3>
        <p className='step-description'>
          Just paste your Figma, PDF, or assignment link—simple, fast, and secure sharing.
        </p>
        <div className='step-illustration'>
          <img src={Works} alt='Upload Assignment' />
        </div>
      </div>
      
      <div className='step-card'>
        <div className='step-number'>02</div>
        <h3 className='step-title'>SHARE BYND LINK</h3>
        <p className='step-description'>
          Your BYND link is unique, secure, and view-tracked. Just copy and share it with the recruiter.
        </p>
        <div className='step-illustration'>
          <img src={Sharebynd} alt='Share BYND Link' />
        </div>
      </div>
      
      <div className='step-card'>
        <div className='step-number'>03</div>
        <h3 className='step-title'>TRACK VIEWS  INSTANTLY</h3>
        <p className='step-description'>
          See if your assignment was viewed, when it was opened, and how many times—all from your BYND Dashboard.
        </p>
        <div className='step-illustration'>
          <img src={Trackview} alt='Track Views' />
        </div>
      </div>
    </div>
    
    <div className='how-it-works-cta'>
      <button className='how-it-works-button'>
        Start tracking for free <img src={Arrow} alt='Arrow' />
      </button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Howitworks
