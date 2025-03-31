import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import FeaturedTherapyServices from './FeaturedTherapyServices';
import CallToAction from './CallToAction';
import Footer from "./Footer";

import Navbar1 from '../navbar/Navbar1';




const Home = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up & Create Profile",
      description: "Get started by creating your personal account and setting up your profile with your goals and preferences.",
      iconUrl: "https://img.icons8.com/?size=100&id=4kuCnjaqo47m&format=png&color=846005"
    },
    {
      id: 2,
      title: "Schedule a Session",
      description: "Browse available times and book your sessions at your convenience.",
      iconUrl: "https://img.icons8.com/?size=100&id=xJ769GpFdv4y&format=png&color=846005"
    },
    {
      id: 3,
      title: "Access Resources & Practice",
      description: "Utilize our comprehensive learning materials and practice exercises to enhance your skills.",
      iconUrl: "https://img.icons8.com/?size=100&id=fWYmjVKaeyR1&format=png&color=846005"
    },
    {
      id: 4,
      title: "Track Progress & Improve",
      description: "Monitor your development over time and receive personalized recommendations for continued growth.",
      iconUrl: "https://img.icons8.com/?size=100&id=M4YSS8OElkNz&format=png&color=846005"
    },
  
  ];


  return (
    <>
      
      <div className='home-container'>
        <img src="https://media.istockphoto.com/id/619079222/photo/female-physical-therapist-testing-female-patients-swallowing-for-rehab.jpg?s=612x612&w=0&k=20&c=Aw9YwXDtGiJ0BRAa2Xm2JvAH248JEnKTqwa8x_0ZIzc=" className="image-home" alt="" />
        <div className='overlay'>
          <h3>Transform Your Speech with Expert Therapy & Interactive Learning!</h3>
          <p>Personalized therapy sessions and expert guidance – all in one place</p>
         <Link to="/therapyscheduling"> <button>Book a consultation now</button></Link>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-title">
            <h2> How It Works</h2>
          </div>

          <div className="steps-container">
            {steps.map((step) => (
              <div key={step.id} className="step-card">
                <div className="step-number">
                  <span>{step.id}</span>
                </div>
                <div className="step-icon">
                  <img
                    src={step.iconUrl}
                    alt={`Step ${step.id} icon`}
                    className="step-icon-image"
                  />
                </div>
                <h3 className="step-title"> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="featuredtherapyservices">
        <FeaturedTherapyServices />
      </section>

      <CallToAction />

      <Footer />
    </>
  )
}

export default Home
