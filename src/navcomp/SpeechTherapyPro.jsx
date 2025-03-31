import React, { useState, useEffect } from 'react';
import './SpeechTherapyPro.css';
import Navbar from '../navbar/Navbar1';

const SpeechTherapyPro = () => {
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('Click to start recording');
  const [result, setResult] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('positive');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleMicClick = () => {
    if (!isListening) {
      // Start recording
      setIsListening(true);
      setStatusText('Listening...');
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        // Stop recording
        setIsListening(false);
        setStatusText('Processing...');
        
        // Simulate processing for 1 second
        setTimeout(() => {
          // Show result
          setStatusText('Click to start recording');
          
          // Randomly choose between correct and slightly off pronunciation
          const outcomes = [
            'She sells seashells by the seashore.',
            'She sells sea shells by the sea shore.',
            'She sells seashells by the sea shore.'
          ];
          
          const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
          setResult(randomOutcome);
          
          // Show feedback
          setShowFeedback(true);
          
          // Determine feedback message based on match
          if (randomOutcome === 'She sells seashells by the seashore.') {
            setFeedbackType('positive');
            setFeedbackMessage('Great job! Your pronunciation was clear and accurate.');
          } else {
            setFeedbackType('negative');
            setFeedbackMessage('Good attempt! Try focusing on connecting "seashells" without separating the words.');
          }
        }, 1000);
      }, 3000);
    }
  };

  const handleExerciseClick = () => {
    // Smooth scroll to speech exercise section
    document.querySelector('.speech-recognition-container').scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <>
    <Navbar/>
    <div className="speech-therapy-app">
     
      
     <main>
       <section className="hero">
         <h1>Interactive Speech Therapy Exercises</h1>
         <p>Improve your speech with our interactive exercises and real-time feedback system. Track your progress and achieve your speech therapy goals with our professionally designed program.</p>
         <button className="btn">Get Started</button>
       </section>
       
       <h2>Speech Exercise Categories</h2>
       <div className="exercises-grid">
         <div className="exercise-card">
           <div className="card-image">
             <span>🔊</span>
           </div>
           <div className="card-content">
             <h3>Articulation Practice</h3>
             <div className="difficulty">
               <div className="difficulty-dot active"></div>
               <div className="difficulty-dot active"></div>
               <div className="difficulty-dot"></div>
             </div>
             <p>Practice pronouncing specific sounds and words with real-time feedback on your articulation.</p>
             <button className="btn" onClick={handleExerciseClick}>Start Exercise</button>
           </div>
         </div>
         
         <div className="exercise-card">
           <div className="card-image">
             <span>🎵</span>
           </div>
           <div className="card-content">
             <h3>Fluency Building</h3>
             <div className="difficulty">
               <div className="difficulty-dot active"></div>
               <div className="difficulty-dot active"></div>
               <div className="difficulty-dot active"></div>
             </div>
             <p>Improve your speech flow and reduce stuttering with progressive fluency-building exercises.</p>
             <button className="btn" onClick={handleExerciseClick}>Start Exercise</button>
           </div>
         </div>
         
         <div className="exercise-card">
           <div className="card-image">
             <span>🗣️</span>
           </div>
           <div className="card-content">
             <h3>Voice Projection</h3>
             <div className="difficulty">
               <div className="difficulty-dot active"></div>
               <div className="difficulty-dot"></div>
               <div className="difficulty-dot"></div>
             </div>
             <p>Learn techniques to improve your voice volume, tone, and projection for clearer communication.</p>
             <button className="btn" onClick={handleExerciseClick}>Start Exercise</button>
           </div>
         </div>
       </div>
       
       <section className="speech-recognition-container">
         <h2>Interactive Speech Exercise</h2>
         <p>Practice pronouncing the phrase below. Click the microphone button and speak clearly.</p>
         
         <div className="speech-exercise">
           <div className="target-phrase">
             She sells seashells by the seashore.
           </div>
           
           <div className="controls">
             <button 
               className={`mic-btn ${isListening ? 'listening' : ''}`} 
               onClick={handleMicClick}
             >
               🎤
             </button>
             <div className="status-text">{statusText}</div>
           </div>
           
           <div className="result-container">
             <h3>Your Pronunciation:</h3>
             <div className="result-box">{result}</div>
             
             {showFeedback && (
               <div className={`feedback-container show`}>
                 <div className="feedback-message">
                   <span className={`feedback-icon feedback-${feedbackType}`}>
                     {feedbackType === 'positive' ? '👍' : '💡'}
                   </span>
                   <span>{feedbackMessage}</span>
                 </div>
               </div>
             )}
           </div>
         </div>
       </section>
       
       <section className="progress-section">
         <h2>Your Progress</h2>
         <div className="progress-chart">
           <h3>Weekly Performance</h3>
           <div className="chart-container">
             <div className="chart-bar" style={{ height: '150px' }}>
               <span className="chart-value">75%</span>
               <span className="chart-label">Mon</span>
             </div>
             <div className="chart-bar" style={{ height: '180px' }}>
               <span className="chart-value">90%</span>
               <span className="chart-label">Tue</span>
             </div>
             <div className="chart-bar" style={{ height: '160px' }}>
               <span className="chart-value">80%</span>
               <span className="chart-label">Wed</span>
             </div>
             <div className="chart-bar" style={{ height: '190px' }}>
               <span className="chart-value">95%</span>
               <span className="chart-label">Thu</span>
             </div>
             <div className="chart-bar" style={{ height: '200px' }}>
               <span className="chart-value">100%</span>
               <span className="chart-label">Fri</span>
             </div>
           </div>
         </div>
       </section>
     </main>
     
     
   </div>
    </>
  );
};

export default SpeechTherapyPro;