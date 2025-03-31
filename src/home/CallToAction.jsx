import React from 'react';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2>Ready to Transform Your Speech?</h2>
          <p>Join thousands of clients who have improved their communication skills with our specialized therapy programs.</p>
          <div className="cta-features">
            <div className="cta-feature">
              <img src="https://img.icons8.com/?size=100&id=11169&format=png&color=000000" alt="Certified therapists icon" />
              <h3>Certified Therapists</h3>
            </div>
            <div className="cta-feature">
              <img src="https://img.icons8.com/?size=100&id=0DZ0mxnGPq14&format=png&color=000000" alt="Personalized plans icon" />
              <h3>Personalized Plans</h3>
            </div>
            <div className="cta-feature">
              <img src="https://img.icons8.com/?size=100&id=85933&format=png&color=000000" alt="Progress tracking icon" />
              <h3>Progress Tracking</h3>
            </div>
          </div>
          <div className="cta-action">
            <h3>Start your speech therapy journey today!</h3>
            <button className="cta-button">Book a Session</button>
          </div>
          <div className="cta-testimonial">
            <p>"The therapy sessions completely transformed my confidence when speaking in public. Highly recommended!"</p>
            <p className="testimonial-author">— Sarah M., Client since 2024</p>
          </div>
        </div>
        <div className="cta-image-container">
          <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="Speech therapy session" className="cta-image" />
          <div className="cta-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;