import React from 'react'
import Final from '../assets/FINAL.svg'
import './mainsection.css'
const Mainsection = () => {
  return (
    <div>
      <div className='mainpage'>
   <div className='hero-section'>
     <div className='hero-content'>
       <h1 className='hero-title'>
         Know when your<br></br> <span className='highlight'>design</span> gets noticed
       </h1>
       <p className='hero-subtitle'>
         Track views, time spent, and recruiter engagement on every design assignment you send — so you never submit blind again.
       </p>
       <button className='hero-cta-button'>
         Start tracking for free
       </button>
     </div>
     <div className='dashboard-section'>
     <img className='dashboard-image' src={Final} alt='BYND Dashboard' />
   </div>
   </div>
 </div>
    </div>
  )
}

export default Mainsection
