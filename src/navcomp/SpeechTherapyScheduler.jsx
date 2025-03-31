// SpeechTherapyScheduler.jsx
import React, { useState, useEffect } from 'react';
import './SpeechTherapyScheduler.css';
import Navbar from '../navbar/Navbar1';

const SpeechTherapyScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState('calendar'); // 'calendar', 'timeSlots', 'confirmation'
  const [therapists, setTherapists] = useState([
    { id: 1, name: "Dr. Emma Watson", specialty: "Speech Sound Disorders", avatar: "https://media.istockphoto.com/id/1413765605/photo/portrait-of-successful-african-american-business-woman.jpg?s=612x612&w=0&k=20&c=7SssKFIuj7EYG_c2A0ZIJUqZpd3hmjQW8P_TMF1WJ5I=" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Language Delays", avatar: "https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=" },
    { id: 3, name: "Dr. Sarah Johnson", specialty: "Fluency Disorders", avatar: "https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg" },
    { id: 4, name: "Dr. Morrone", specialty: "Accent Modification", avatar: "https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg" },

  ]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [userAppointments, setUserAppointments] = useState([
    { id: 101, date: '2025-04-02', time: '10:00', therapistId: 1, status: 'confirmed' },
    { id: 102, date: '2025-04-15', time: '14:30', therapistId: 3, status: 'confirmed' }
  ]);

  // Generate days for the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', date: null });
    }
    
    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dateString = currentDate.toISOString().split('T')[0];
      const hasAppointment = userAppointments.some(apt => apt.date === dateString);
      
      days.push({
        day: i,
        date: dateString,
        hasAppointment
      });
    }
    
    return days;
  };

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Available time slots
  const getAvailableTimeSlots = () => {
    return [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setView('timeSlots');
    }
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setView('confirmation');
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    const newAppointment = {
      id: Math.floor(Math.random() * 1000) + 200,
      date: selectedDate,
      time: selectedTime,
      therapistId: selectedTherapist.id,
      status: 'confirmed'
    };
    
    setUserAppointments([...userAppointments, newAppointment]);
    setView('calendar');
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedTherapist(null);
  };

  // Handle cancellation
  const handleCancelAppointment = (appointmentId) => {
    setUserAppointments(userAppointments.filter(apt => apt.id !== appointmentId));
  };

  // Get therapist name by ID
  const getTherapistName = (id) => {
    const therapist = therapists.find(t => t.id === id);
    return therapist ? therapist.name : 'Unknown Therapist';
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
    <Navbar/>
    <div className="speech-therapy-scheduler">
      <div className="scheduler-header">
        <h1>Speech Therapy Appointments</h1>
        <p>Schedule, reschedule, or cancel your speech therapy sessions</p>
        
        <div className="scheduler-tabs">
          <button 
            className={view === 'calendar' ? 'active' : ''} 
            onClick={() => setView('calendar')}
          >
            Calendar
          </button>
          <button 
            onClick={() => setView('myAppointments')}
            className={view === 'myAppointments' ? 'active' : ''}
          >
            My Appointments
          </button>
        </div>
      </div>

      {view === 'calendar' && (
        <div className="calendar-view">
          <div className="month-selector">
            <button onClick={goToPreviousMonth} className="month-nav">&lt;</button>
            <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={goToNextMonth} className="month-nav">&gt;</button>
          </div>
          
          <div className="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          
          <div className="calendar-grid">
            {getDaysInMonth(currentDate).map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${!day.day ? 'empty' : ''} ${day.hasAppointment ? 'has-appointment' : ''}`}
                onClick={() => day.day && handleDateSelect(day.date)}
              >
                {day.day}
                {day.hasAppointment && <span className="appointment-indicator"></span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'timeSlots' && (
        <div className="time-slots-view">
          <h2>Select Time for {formatDate(selectedDate)}</h2>
          
          <div className="therapist-selection">
            <h3>Choose Therapist:</h3>
            <div className="therapist-list">
              {therapists.map(therapist => (
                <div 
                  key={therapist.id} 
                  className={`therapist-card ${selectedTherapist?.id === therapist.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTherapist(therapist)}
                >
                  <img src={therapist.avatar} alt={therapist.name} className="therapist-avatar" />
                  <div>
                    <h4>{therapist.name}</h4>
                    <p>{therapist.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="time-slots-grid">
            {getAvailableTimeSlots().map(time => (
              <button 
                key={time} 
                className="time-slot"
                onClick={() => selectedTherapist && handleTimeSelect(time)}
                disabled={!selectedTherapist}
              >
                {time}
              </button>
            ))}
          </div>
          
          <button className="back-button" onClick={() => setView('calendar')}>
            Back to Calendar
          </button>
        </div>
      )}

      {view === 'confirmation' && (
        <div className="confirmation-view">
          <h2>Confirm Your Appointment</h2>
          
          <div className="appointment-summary">
            <div className="summary-row">
              <span>Date:</span>
              <span>{formatDate(selectedDate)}</span>
            </div>
            <div className="summary-row">
              <span>Time:</span>
              <span>{selectedTime}</span>
            </div>
            <div className="summary-row">
              <span>Therapist:</span>
              <span>{selectedTherapist.name}</span>
            </div>
            <div className="summary-row">
              <span>Specialty:</span>
              <span>{selectedTherapist.specialty}</span>
            </div>
          </div>
          
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
            <button className="back-button" onClick={() => setView('timeSlots')}>
              Back to Time Selection
            </button>
          </div>
        </div>
      )}

      {view === 'myAppointments' && (
        <div className="my-appointments-view">
          <h2>My Upcoming Appointments</h2>
          
          {userAppointments.length === 0 ? (
            <p className="no-appointments">You have no scheduled appointments.</p>
          ) : (
            <div className="appointments-list">
              {userAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-details">
                    <h3>{formatDate(appointment.date)}</h3>
                    <p>Time: {appointment.time}</p>
                    <p>Therapist: {getTherapistName(appointment.therapistId)}</p>
                    <p className="status">Status: <span>{appointment.status}</span></p>
                  </div>
                  <div className="appointment-actions">
                    <button 
                      className="reschedule-button"
                      onClick={() => {
                        setSelectedDate(appointment.date);
                        setView('timeSlots');
                        handleCancelAppointment(appointment.id);
                      }}
                    >
                      Reschedule
                    </button>
                    <button 
                      className="cancel-button"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button className="back-button" onClick={() => setView('calendar')}>
            Back to Calendar
          </button>
        </div>
      )}
    </div>
    </>
    
  );
};

export default SpeechTherapyScheduler;