import React, { useState } from 'react';
import './UpdateProfile.css';
import Navbar1 from '../navbar/Navbar1';

const UserProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "(555) 987-6543",
    dateOfBirth: "1992-05-15",
    address: "123 Main Street, Anytown, CA 94321",
    emergencyContact: "Jamie Thompson, (555) 789-0123",
    therapyGoals: "Improve speech fluency and pronunciation of complex words",
    medicalHistory: "Speech delay identified at age 5, previous therapy 2019-2020",
    insuranceProvider: "HealthPlus",
    insuranceNumber: "HP78901234"
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { id: 1, therapist: "Dr. Sarah Johnson", date: "April 2, 2025", time: "10:00 AM", status: "Confirmed" },
    { id: 2, therapist: "Dr. Michael Rodriguez", date: "April 15, 2025", time: "2:30 PM", status: "Pending" }
  ]);

  const [pastAppointments, setPastAppointments] = useState([
    { id: 101, therapist: "Dr. Sarah Johnson", date: "March 25, 2025", time: "11:00 AM", notes: "Worked on /r/ sounds, good progress" },
    { id: 102, therapist: "Dr. Sarah Johnson", date: "March 18, 2025", time: "11:00 AM", notes: "Focused on breath control and pacing" }
  ]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving profile data:", profileData);
    setEditMode(false);
  };

  return (
    <>
    <Navbar1/>
    <div className="spt-user-profile-container">
      <div className="spt-profile-header">
        <div className="spt-profile-avatar">
          {profileData.name.split(' ').map(word => word[0]).join('')}
        </div>
        <div className="spt-profile-header-content">
          {editMode ? (
            <input 
              type="text" 
              name="name" 
              value={profileData.name} 
              onChange={handleChange} 
              className="spt-edit-input spt-edit-name"
            />
          ) : (
            <h1>{profileData.name}</h1>
          )}
          <div className="spt-profile-status">Client</div>
        </div>
        <button className="spt-edit-button" onClick={handleEditToggle}>
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
        {editMode && (
          <button className="spt-save-button" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>

      <div className="spt-profile-content">
        <div className="spt-profile-section">
          <h3>Personal Information</h3>
          <div className="spt-info-item">
            <span className="spt-info-label">Email:</span>
            {editMode ? (
              <input 
                type="email" 
                name="email" 
                value={profileData.email} 
                onChange={handleChange} 
                className="spt-edit-input"
              />
            ) : (
              <span>{profileData.email}</span>
            )}
          </div>
          <div className="spt-info-item">
            <span className="spt-info-label">Phone:</span>
            {editMode ? (
              <input 
                type="tel" 
                name="phone" 
                value={profileData.phone} 
                onChange={handleChange} 
                className="spt-edit-input"
              />
            ) : (
              <span>{profileData.phone}</span>
            )}
          </div>
          <div className="spt-info-item">
            <span className="spt-info-label">Date of Birth:</span>
            {editMode ? (
              <input 
                type="date" 
                name="dateOfBirth" 
                value={profileData.dateOfBirth} 
                onChange={handleChange} 
                className="spt-edit-input"
              />
            ) : (
              <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
            )}
          </div>
          <div className="spt-info-item">
            <span className="spt-info-label">Address:</span>
            {editMode ? (
              <input 
                type="text" 
                name="address" 
                value={profileData.address} 
                onChange={handleChange} 
                className="spt-edit-input"
              />
            ) : (
              <span>{profileData.address}</span>
            )}
          </div>
          <div className="spt-info-item">
            <span className="spt-info-label">Emergency Contact:</span>
            {editMode ? (
              <input 
                type="text" 
                name="emergencyContact" 
                value={profileData.emergencyContact} 
                onChange={handleChange} 
                className="spt-edit-input"
              />
            ) : (
              <span>{profileData.emergencyContact}</span>
            )}
          </div>
        </div>

        <div className="spt-profile-section">
          <h3>Therapy Information</h3>
          <div className="spt-info-item">
            <span className="spt-info-label">Therapy Goals:</span>
            {editMode ? (
              <textarea 
                name="therapyGoals" 
                value={profileData.therapyGoals} 
                onChange={handleChange} 
                className="spt-edit-textarea"
              />
            ) : (
              <span>{profileData.therapyGoals}</span>
            )}
          </div>
          <div className="spt-info-item">
            <span className="spt-info-label">Medical History:</span>
            {editMode ? (
              <textarea 
                name="medicalHistory" 
                value={profileData.medicalHistory} 
                onChange={handleChange} 
                className="spt-edit-textarea"
              />
            ) : (
              <span>{profileData.medicalHistory}</span>
            )}
          </div>
        </div>

        <div className="spt-profile-section">
          <h3>Insurance Information</h3>
          <div className="spt-info-item">
            <span className="spt-info-label">Provider:</span>
            {editMode ? (
              <input 
                type="text" 
                name="insuranceProvider" 
                value={profileData.insuranceProvider} 
                onChange={handleChange} 
                className="spt-edit-input"
              />
            ) : (
              <span>{profileData.insuranceProvider}</span>
            )}
          </div>
          <div className="spt-info-item">
            <span className="spt-info-label">Policy Number:</span>
            {editMode ? (
              <input 
                type="text" 
                name="insuranceNumber" 
                value={profileData.insuranceNumber} 
                onChange={handleChange} 
                className="spt-edit-input"
              />
            ) : (
              <span>{profileData.insuranceNumber}</span>
            )}
          </div>
        </div>

        <div className="spt-profile-section">
          <h3>Upcoming Appointments</h3>
          {upcomingAppointments.length > 0 ? (
            <div className="spt-appointments-list">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="spt-appointment-card">
                  <div className="spt-appointment-header">
                    <span className="spt-appointment-therapist">{appointment.therapist}</span>
                    <span className={`spt-appointment-status spt-${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="spt-appointment-details">
                    <div className="spt-appointment-date">
                      <span className="spt-detail-label">Date:</span> {appointment.date}
                    </div>
                    <div className="spt-appointment-time">
                      <span className="spt-detail-label">Time:</span> {appointment.time}
                    </div>
                  </div>
                  <div className="spt-appointment-actions">
                    <button className="spt-reschedule-button">Reschedule</button>
                    <button className="spt-cancel-button">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="spt-no-appointments">No upcoming appointments</p>
          )}
          <button className="spt-book-appointment-button">Book New Appointment</button>
        </div>

        <div className="spt-profile-section">
          <h3>Past Appointments</h3>
          {pastAppointments.length > 0 ? (
            <div className="spt-appointments-list">
              {pastAppointments.map(appointment => (
                <div key={appointment.id} className="spt-appointment-card past">
                  <div className="spt-appointment-header">
                    <span className="spt-appointment-therapist">{appointment.therapist}</span>
                    <span className="spt-appointment-completed">Completed</span>
                  </div>
                  <div className="spt-appointment-details">
                    <div className="spt-appointment-date">
                      <span className="spt-detail-label">Date:</span> {appointment.date}
                    </div>
                    <div className="spt-appointment-time">
                      <span className="spt-detail-label">Time:</span> {appointment.time}
                    </div>
                  </div>
                  <div className="spt-appointment-notes">
                    <span className="spt-detail-label">Notes:</span> {appointment.notes}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="spt-no-appointments">No past appointments</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfilePage;