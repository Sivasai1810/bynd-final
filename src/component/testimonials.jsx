import React from 'react'
import Review from "../assets/qoutes.svg"
import Profile from "../assets/Profiles.svg"
import './testimonials.css'
const Testimonials = () => {
  return (
    <div>
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
    </div>
  )
}

export default Testimonials
