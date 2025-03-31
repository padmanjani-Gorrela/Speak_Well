import React, { useState } from 'react';
import './Settings.css';
import Navbar1 from '../navbar/Navbar1';

const Settings = () => {
  const [settings, setSettings] = useState({
    voiceSpeed: 1.0,
    autoPlayExercises: true,
    reminderNotifications: true,
    textSize: 'medium',
    highContrastMode: false,
    recordingQuality: 'high',
    showProgressMetrics: true,
    exerciseDifficulty: 'adaptive'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
    setSavedSuccess(false);
  };

  const handleSliderChange = (e) => {
    setSettings({
      ...settings,
      voiceSpeed: parseFloat(e.target.value)
    });
    setSavedSuccess(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate saving settings to backend
    setTimeout(() => {
      setSavedSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 500);
  };

  return (
   <>
   <Navbar1/>
    <div className="settings-container">
      <div className="settings-card">
        <h1>Speech Therapy Settings</h1>
        
        <form onSubmit={handleSave}>
          <div className="settings-section">
            <h2>Voice & Audio</h2>
            
            <div className="setting-item">
              <label htmlFor="voiceSpeed">Voice Speed: {settings.voiceSpeed}x</label>
              <div className="slider-container">
                <input
                  type="range"
                  id="voiceSpeed"
                  name="voiceSpeed"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.voiceSpeed}
                  onChange={handleSliderChange}
                />
              </div>
            </div>
            
            <div className="setting-item">
              <label htmlFor="recordingQuality">Recording Quality</label>
              <select
                id="recordingQuality"
                name="recordingQuality"
                value={settings.recordingQuality}
                onChange={handleChange}
              >
                <option value="low">Low (Save Space)</option>
                <option value="medium">Medium</option>
                <option value="high">High (Best Quality)</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h2>Exercise Preferences</h2>
            
            <div className="setting-item checkbox">
              <input
                type="checkbox"
                id="autoPlayExercises"
                name="autoPlayExercises"
                checked={settings.autoPlayExercises}
                onChange={handleChange}
              />
              <label htmlFor="autoPlayExercises">Auto-play exercise clips</label>
            </div>
            
            <div className="setting-item">
              <label htmlFor="exerciseDifficulty">Exercise Difficulty</label>
              <select
                id="exerciseDifficulty"
                name="exerciseDifficulty"
                value={settings.exerciseDifficulty}
                onChange={handleChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="adaptive">Adaptive (Recommended)</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h2>Appearance</h2>
            
            <div className="setting-item">
              <label htmlFor="textSize">Text Size</label>
              <select
                id="textSize"
                name="textSize"
                value={settings.textSize}
                onChange={handleChange}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="x-large">Extra Large</option>
              </select>
            </div>
            
            <div className="setting-item checkbox">
              <input
                type="checkbox"
                id="highContrastMode"
                name="highContrastMode"
                checked={settings.highContrastMode}
                onChange={handleChange}
              />
              <label htmlFor="highContrastMode">High contrast mode</label>
            </div>
          </div>

          <div className="settings-section">
            <h2>Notifications</h2>
            
            <div className="setting-item checkbox">
              <input
                type="checkbox"
                id="reminderNotifications"
                name="reminderNotifications"
                checked={settings.reminderNotifications}
                onChange={handleChange}
              />
              <label htmlFor="reminderNotifications">Practice reminders</label>
            </div>
            
            <div className="setting-item checkbox">
              <input
                type="checkbox"
                id="showProgressMetrics"
                name="showProgressMetrics"
                checked={settings.showProgressMetrics}
                onChange={handleChange}
              />
              <label htmlFor="showProgressMetrics">Show progress metrics</label>
            </div>
          </div>

          <div className="settings-actions">
            <button type="submit" className="save-button">Save Settings</button>
            {savedSuccess && <span className="save-success">Settings saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
   </>
  );
};

export default Settings;