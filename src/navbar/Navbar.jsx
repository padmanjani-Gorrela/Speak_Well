import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {

  const [darkMode, setDarkMode] = useState(() => {
  
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
 
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  
  useEffect(() => {

    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className='navbar-container'>
      <div className='navbar-content'>
      <Link to="/"><div className='logo'>
          Logo
        </div></Link>  
        <div className='navbar-right'>
          <div className='search-container'>
            <input type="text" placeholder='What services are you looking for?' className='search-input' />
            <button className='search-button'>
              <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className='icon-container'>
            <img src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000" alt="Notification" className='nav-icon' />
            <img src="https://img.icons8.com/?size=100&id=5297&format=png&color=000000" alt="Message" className='nav-icon' />
            <img src="https://img.icons8.com/?size=100&id=6904&format=png&color=000000" alt="Profile" className='nav-icon' />
            <button
              onClick={toggleDarkMode}
              className='dark-mode-toggle'
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          <button className='login-button' onClick={() => setShowLogin(true)}>Login</button>
      {showLogin && (
        <div className='login-modal' onClick={() => setShowLogin(false)}>
          <div className='login-container' onClick={(e) => e.stopPropagation()}>
            <span className='close-icon' onClick={() => setShowLogin(false)}>&times;</span>
            <h2 className='login-title'>Login</h2>
            <input type='text' placeholder='Email or Phone Number' />
            <input type='password' placeholder='Password' />
            <Link to='/home'>
              <button>Login</button>
            </Link>
            <p>Don't have an account? <Link to='/signup' onClick={() => setShowLogin(false)}><span>Sign up</span></Link></p>
          </div>
        </div>
      )}
      
        </div>
      </div>
      <hr className='divider' />
      <nav className='navigation'>
        <ul className='nav-menu'>
          <li>Therapy Services</li>
          <li>Schedule a Session</li>
          <li>Resources</li>
          <li>Progress Tracking</li>
          <li>Exercises</li>
          <li>Communicate</li>
          <li>Reviews and Ratings</li>
          <li>subscription</li>
          <li>Help</li>
        </ul>
      </nav>
      <hr className='divider' />
    </div>
  );
};

export default Navbar;