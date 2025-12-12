// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-scroll';
// import { useNavigate } from 'react-router-dom';
// import Bynd from "../assets/byndlogo.svg";
// import './nav-bar.css';

// const Navbar = () => {
//   const Navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
    
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
    
//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };
    
//   const closeMenus = () => {
//     setIsMenuOpen(false);
//     Navigate('/login');
//   };
    
//   // Close menu when clicking outside or on a link
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMenuOpen && !event.target.closest('.nav-container')) {
//         closeMenu();
//       }
//     };
    
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [isMenuOpen]);

//   return (
//     <div>
//       <nav className='navbar'>
//         <div className='nav-container'>
//           <div className='nav-logo'>
//             <img src={Bynd} alt='BYND' />
//           </div>
          
//           <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id='nav-menu'>
//             <ul className='nav-links' style={{cursor:'pointer'}}>
//               <li><Link to='features' smooth={true} duration={70} onClick={closeMenu}>Features</Link></li>
//               <li><Link to='how-it-works' smooth={true} duration={70} onClick={closeMenu}>How it works</Link></li>
//               <li><Link to='faqs' smooth={true} duration={70} onClick={closeMenu}>FAQs</Link></li>
//               <li><Link to='pricing' smooth={true} duration={70} onClick={closeMenu}>Pricing</Link></li>
//               <li><Link to='contact' smooth={true} duration={70} onClick={closeMenu}>Contact</Link></li>
              
//               {/* Mobile-only buttons inside menu */}
//               <li className='mobile-nav-actions'>
//                 <a href='' className='nav-login mobile-login' onClick={closeMenus}>Login</a>
//                 <button className='nav-cta-button mobile-cta' onClick={closeMenu}>Start tracking for free</button>
//               </li>
//             </ul>
//           </div>
          
//           {/* Desktop-only buttons */}
//           <div className='nav-actions desktop-only'>
//             <a href='' className='nav-login' onClick={closeMenus}>Login</a>
//             <button className='nav-cta-button' onClick={closeMenu}>Start tracking for free</button>
//           </div>
          
//           <div 
//             className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
//             id='nav-toggle' 
//             onClick={toggleMenu}
//             role="button"
//             tabIndex="0"
//             aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
//             aria-expanded={isMenuOpen}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') {
//                 e.preventDefault();
//                 toggleMenu();
//               }
//             }}
//           >
//             <span className='bar'></span>
//             <span className='bar'></span>
//             <span className='bar'></span>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import Bynd from "../assets/byndlogo.svg"
import { useNavigate } from 'react-router-dom'
import './nav-bar.css'

const Navbar = () => {
  const Navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
    
  const closeMenu = () => {
    setIsMenuOpen(false)
  }
    
  const closeMenus = () => {
    setIsMenuOpen(false)
    Navigate('/login')
  }
    
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-container')) {
        closeMenu()
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <div>
      <nav className='navbar'>
        <div className='nav-container'>
          <div className='nav-logo'>
            <img src={Bynd} alt='BYND' />
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id='nav-menu'>
            <ul className='nav-links' style={{cursor:'pointer'}}>
              <li><Link to='features' smooth={true} duration={70} onClick={closeMenu}>Features</Link></li>
              <li><Link to='how-it-works' smooth={true} duration={70} onClick={closeMenu}>How it works</Link></li>
              <li><Link to='faqs' smooth={true} duration={70} onClick={closeMenu}>FAQs</Link></li>
              <li><Link to='pricing' smooth={true} duration={70} onClick={closeMenu}>Pricing</Link></li>
              <li><Link to='contact' smooth={true} duration={70} onClick={closeMenu}>Contact</Link></li>
              
              {/* Mobile-only Login button */}
              <li className='mobile-nav-actions'>
                <a href='' className='nav-login mobile-login' onClick={closeMenus}>Login</a>
              </li>
            </ul>
          </div>
          
          {/* Desktop-only buttons */}
          <div className='nav-actions desktop-only'>
            <a href='' className='nav-login' onClick={closeMenus}>Login</a>
            <button className='nav-cta-button' onClick={closeMenus}>Start tracking for free</button>
          </div>
          
          <div 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
            id='nav-toggle' 
            onClick={toggleMenu}
            role="button"
            tabIndex="0"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
          >
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar