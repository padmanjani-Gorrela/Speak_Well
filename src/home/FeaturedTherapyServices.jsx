import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FeaturedTherapyServices.css'; // Import your CSS file for styling
import Navbar from '../navbar/Navbar1';

const FeaturedTherapyServices = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null);
  
  const therapyServices = [
    {
      id: 1,
      title: "Speech Delay Therapy",
      description: "Helping children/adult develop speech at an appropriate pace.",
      imageUrl: "https://walkietalkiespeechtherapy.com/wp-content/uploads/2021/08/9.jpg"
    },
    {
      id: 2,
      title: "Stuttering Therapy",
      description: "Techniques to improve fluency and confidence in speech.",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      id: 3,
      title: "Articulation Therapy",
      description: "Enhancing clarity by correcting pronunciation issues.",
      imageUrl: "https://constanttherapyhealth.com/wp-content/uploads/2024/08/adult-speech-therapy.jpg"
    },
    {
      id: 4,
      title: "Voice Therapy",
      description: "Strengthening and improving voice tone, pitch, and quality.",
      imageUrl: "https://therapypms.com/wp-content/uploads/2024/08/voice-therapy-1.webp"
    },
    {
      id: 5,
      title: "Apraxia Therapy",
      description: "Addressing speech motor planning difficulties for smoother communication.",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      id: 6,
      title: "Fluency Therapy",
      description: "Strategies to reduce speech blocks and hesitations.",
      imageUrl: "https://wonderspeak.com/wp-content/uploads/2020/08/Stuttering-Cure-Speech-Therapy-Toronto.jpg"
    },
    {
      id: 7,
      title: "Social Communication Therapy",
      description: "Helping individuals navigate conversations and social cues effectively.",
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      id: 8,
      title: "Accent Modification Therapy",
      description: "Refining pronunciation for better clarity in different languages.",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      id: 9,
      title: "Swallowing Therapy",
      description: "Addressing speech and swallowing disorders for safer eating and speaking.",
      imageUrl: "https://doctorphysiotw.com/wp-content/uploads/2023/11/Voice-Swallowing-Speech-Therapy-Delray-beach-Fort-Lauderdale-FL-Dr.Physio-Therapy-and-Wellness-1.jpg"
    },
  ];

  const scroll = (direction) => {
    const container = sliderRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update scroll position for button visibility
      setTimeout(() => {
        setScrollPosition(container.scrollLeft);
      }, 500);
    }
  };

  return (
    <>
    <Navbar/>
    <section className="featured-therapy-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-title">
            <h2>Featured Therapy Services</h2>
            <p>A curated set of therapy sessions designed to help individuals overcome speech-related challenges</p>
          </div>
          <div className="slider-controls">
            <button 
              className={`slider-button ${scrollPosition <= 10 ? 'disabled' : ''}`} 
              onClick={() => scroll('left')}
              disabled={scrollPosition <= 10}
            >
              <ChevronLeft />
            </button>
            <button 
              className="slider-button" 
              onClick={() => scroll('right')}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        
        <div className="therapy-slider-container">
          <div className="therapy-slider" ref={sliderRef}>
            {therapyServices.map((service) => (
              <div key={service.id} className="therapy-card">
                <div className="therapy-image-container">
                  <img src={service.imageUrl} alt={service.title} className="therapy-image" />
                </div>
                <div className="therapy-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button className="learn-more-btn">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default FeaturedTherapyServices;