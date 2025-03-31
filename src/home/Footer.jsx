import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-waves">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="wave-fill"></path>
        </svg>
      </div>
      
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section about">
            <div className="logo-container">
              <h2 className="logo-text">Speech<span>Therapy</span></h2>
              <div className="speech-bubble">
                <span>Transform Your Voice!</span>
              </div>
            </div>
            <p>
              Dedicated to improving communication skills through personalized therapy and innovative techniques.
            </p>
            <div className="contact">
              <span><i className="fas fa-phone"></i> (123) 456-7890</span>
              <span><i className="fas fa-envelope"></i> contact@speechtherapy.com</span>
            </div>
          </div>
          
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <div className="link-columns">
              <div className="link-column">
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                <Link to="/services">Services</Link>
                <Link to="/therapists">Our Therapists</Link>
              </div>
              <div className="link-column">
                <Link to="/resources">Resources</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="footer-section newsletter">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest news and tips.</p>
            <form>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn">Subscribe</button>
            </form>
            <div className="footer-awards">
              <div className="award">
                <img src="https://img.icons8.com/?size=100&id=gaPaLIcj658F&format=png&color=ffffff" alt="Award" />
                <span>Best Therapy Center 2025</span>
              </div>
              <div className="award">
                <img src="https://img.icons8.com/?size=100&id=23535&format=png&color=ffffff" alt="Certified" />
                <span>ASHA Certified</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-locations">
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <span>New York</span>
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <span>Chicago</span>
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <span>Los Angeles</span>
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <span>India</span>
            </div>
            <div className="location">
              <i className="fas fa-map-marker-alt"></i>
              <span>Italy</span>
            </div>
          </div>
          
          <div className="copyright">
            &copy; {currentYear} SpeechTherapy | Transforming lives through better communication
          </div>
          
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
      
      <div className="footer-accent">
        <div className="accent-circle accent-circle-1"></div>
        <div className="accent-circle accent-circle-2"></div>
        <div className="accent-circle accent-circle-3"></div>
      </div>
    </footer>
  );
};

export default Footer;