import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ProgressDashboard.css'; // Assuming you have a CSS file for styling
import Navbar1 from '../navbar/Navbar1';
// Note: The component will use your external CSS file, which should be imported in your main application file
// or linked in your HTML file, not imported directly here as I had in the previous version

const SpeechTherapyTracker = () => {
  const progressChartRef = useRef(null);
  const exerciseChartRef = useRef(null);
  const progressChartInstance = useRef(null);
  const exerciseChartInstance = useRef(null);

  useEffect(() => {
    // Initialize Progress Chart
    if (progressChartRef.current) {
      const progressCtx = progressChartRef.current.getContext('2d');
      
      if (progressChartInstance.current) {
        progressChartInstance.current.destroy();
      }
      
      progressChartInstance.current = new Chart(progressCtx, {
        type: 'line',
        data: {
          labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
          datasets: [
            {
              label: 'Articulation',
              data: [42, 55, 63, 70, 78, 85],
              borderColor: '#846005',
              backgroundColor: 'rgba(132, 96, 5, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'Fluency',
              data: [30, 37, 45, 52, 58, 62],
              borderColor: '#846005',
              backgroundColor: 'rgba(132, 96, 5, 0.05)',
              borderDash: [5, 5],
              tension: 0.3,
              fill: true
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                color: '#846005'
              },
              grid: {
                color: 'rgba(132, 96, 5, 0.1)'
              }
            },
            x: {
              ticks: {
                color: '#846005'
              },
              grid: {
                color: 'rgba(132, 96, 5, 0.1)'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: '#846005'
              }
            }
          }
        }
      });
    }

    // Initialize Exercise Chart
    if (exerciseChartRef.current) {
      const exerciseCtx = exerciseChartRef.current.getContext('2d');
      
      if (exerciseChartInstance.current) {
        exerciseChartInstance.current.destroy();
      }
      
      exerciseChartInstance.current = new Chart(exerciseCtx, {
        type: 'radar',
        data: {
          labels: ['Reading Aloud', 'Tongue Twisters', 'Breathing Exercises', 'Pronunciation Drills', 'Word Finding'],
          datasets: [{
            label: 'Current Performance',
            data: [85, 70, 90, 65, 75],
            backgroundColor: 'rgba(132, 96, 5, 0.2)',
            borderColor: '#846005',
            pointBackgroundColor: '#846005',
            pointBorderColor: '#fff'
          }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                color: 'rgba(132, 96, 5, 0.1)'
              },
              grid: {
                color: 'rgba(132, 96, 5, 0.1)'
              },
              pointLabels: {
                color: '#846005'
              },
              ticks: {
                backdropColor: 'transparent',
                color: '#846005'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: '#846005'
              }
            }
          }
        }
      });
    }

    // Simulate progress bar animation on page load
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
    
    // Cleanup on component unmount
    return () => {
      if (progressChartInstance.current) {
        progressChartInstance.current.destroy();
      }
      if (exerciseChartInstance.current) {
        exerciseChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <>
    <Navbar1/>
    <div className="container">
      <header>
        <h1>Speech Therapy Progress Tracker</h1>
        <p>Track your improvement over time with visual analytics</p>
      </header>
      
      <div className="dashboard">
        <div className="card">
          <div className="card-header">
            <h2>Overall Progress</h2>
          </div>
          <div className="card-body">
            <div className="stat-box">
              <div className="stat-value">78%</div>
              <div className="stat-label">Overall Improvement</div>
            </div>
            <p>Based on the last 12 sessions</p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: '78%' }}></div>
            </div>
            <div className="stat-box">
              <div className="stat-value">16</div>
              <div className="stat-label">Total Sessions</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h2>Areas of Focus</h2>
          </div>
          <div className="card-body">
            <div>
              <p>Articulation</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <p>Fluency</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <p>Voice Quality</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <p>Language Comprehension</p>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card full-width">
          <div className="card-header">
            <h2>Progress Over Time</h2>
            <select id="chart-timeframe">
              <option value="weekly">Weekly</option>
              <option value="monthly" selected>Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <canvas ref={progressChartRef}></canvas>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h2>Recent Sessions</h2>
          </div>
          <div className="card-body">
            <ul className="session-list">
              <li className="session-item">
                <div className="session-date">March 28, 2025</div>
                <p>Focused on: Articulation, Fluency</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '82%' }}></div>
                </div>
              </li>
              <li className="session-item">
                <div className="session-date">March 21, 2025</div>
                <p>Focused on: Voice Quality, Pronunciation</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '78%' }}></div>
                </div>
              </li>
              <li className="session-item">
                <div className="session-date">March 14, 2025</div>
                <p>Focused on: Language Comprehension</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '75%' }}></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h2>Performance by Exercise</h2>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <canvas ref={exerciseChartRef}></canvas>
            </div>
          </div>
        </div>
        
        <div className="card full-width">
          <div className="card-header">
            <h2>Next Steps</h2>
          </div>
          <div className="card-body">
            <p><strong>Recommended Focus Areas:</strong></p>
            <ul>
              <li>Continue practicing fluency exercises for 15 minutes daily</li>
              <li>Work on challenging articulation exercises (See recommended list)</li>
              <li>Practice reading aloud for 10 minutes to improve rhythm and pacing</li>
            </ul>
            <p style={{ marginTop: '15px' }}><strong>Next Session:</strong> April 4, 2025 at 2:00 PM</p>
            <div style={{ marginTop: '20px' }}>
              <button className="btn">Schedule New Session</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SpeechTherapyTracker;