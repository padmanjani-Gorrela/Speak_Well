import React, { useState, useEffect, useRef } from 'react';
import './CommunicationTools.css';
import { BsChatDots, BsCameraVideo, BsFileEarmark, BsBell, BsPeople } from 'react-icons/bs';
import Navbar from '../navbar/Navbar1';

const CommunicationTools = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Sample data - would be replaced with actual API calls
  const sampleMessages = [
    { id: 1, sender: 'Dr. Smith', content: 'Hello! How are you feeling today?', timestamp: '10:30 AM' },
    { id: 2, sender: 'You', content: 'I\'m doing better than yesterday. The exercises helped.', timestamp: '10:32 AM' },
    { id: 3, sender: 'Dr. Smith', content: 'That\'s great to hear! Would you like to discuss any specific concerns today?', timestamp: '10:33 AM' }
  ];
  
  const sampleNotifications = [
    { id: 1, content: 'Upcoming session with Dr. Smith tomorrow at 2:00 PM', timestamp: '1 hour ago', unread: true },
    { id: 2, content: 'New resource shared: "Managing Anxiety" PDF', timestamp: '3 hours ago', unread: false }
  ];
  
  const sampleGroups = [
    { id: 1, name: 'Anxiety Support Group', members: 8, nextSession: 'Wed, 4:00 PM' },
    { id: 2, name: 'Mindfulness Practice', members: 12, nextSession: 'Thu, 6:00 PM' }
  ];
  
  useEffect(() => {
    // Load initial data
    setMessages(sampleMessages);
    setNotifications(sampleNotifications);
    
    // Scroll to bottom of messages
    scrollToBottom();
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  const startVideoCall = () => {
    setIsVideoCall(true);
  };
  
  const endVideoCall = () => {
    setIsVideoCall(false);
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`File "${file.name}" selected. In a production environment, this would be securely uploaded.`);
      // Add file sharing logic here
    }
  };
  
  return (
    <>
    <Navbar/>
    <div className="communication-tools">
      {isVideoCall ? (
        <div className="video-call-container">
          <div className="video-main">
            <div className="video-remote">
              <div className="video-placeholder">
                <span>Dr. Smith</span>
              </div>
            </div>
            <div className="video-local">
              <div className="video-placeholder small">
                <span>You</span>
              </div>
            </div>
            <div className="video-controls">
              <button className="control-button mute">Mute</button>
              <button className="control-button video-toggle">Disable Video</button>
              <button className="control-button end-call" onClick={endVideoCall}>End Call</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="communication-panel">
          <div className="sidebar">
            <nav className="nav-tabs">
              <button 
                className={`nav-tab ${activeTab === 'messages' ? 'active' : ''}`} 
                onClick={() => setActiveTab('messages')}
              >
                <BsChatDots /> <span className="tab-label">Messages</span>
              </button>
              <button 
                className={`nav-tab ${activeTab === 'groups' ? 'active' : ''}`} 
                onClick={() => setActiveTab('groups')}
              >
                <BsPeople /> <span className="tab-label">Groups</span>
              </button>
              <button 
                className={`nav-tab ${activeTab === 'notifications' ? 'active' : ''}`} 
                onClick={() => setActiveTab('notifications')}
              >
                <BsBell /> <span className="tab-label">Notifications</span>
                {notifications.some(n => n.unread) && <span className="notification-badge"></span>}
              </button>
            </nav>
            
            <div className="action-buttons">
              <button className="action-button" onClick={startVideoCall}>
                <BsCameraVideo /> <span>Start Video Session</span>
              </button>
            </div>
          </div>
          
          <div className="content-area">
            {activeTab === 'messages' && (
              <div className="messages-container">
                <div className="messages-header">
                  <h2>Conversation with Dr. Smith</h2>
                  <div className="conversation-actions">
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="file-input" 
                      onChange={handleFileUpload} 
                    />
                    <label htmlFor="file-upload" className="file-button">
                      <BsFileEarmark /> Share File
                    </label>
                  </div>
                </div>
                
                <div className="messages-list">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        <p>{message.content}</p>
                        <span className="message-time">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <form className="message-input" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            )}
            
            {activeTab === 'groups' && (
              <div className="groups-container">
                <h2>Group Sessions</h2>
                <div className="groups-list">
                  {sampleGroups.map(group => (
                    <div key={group.id} className="group-card">
                      <h3>{group.name}</h3>
                      <p>{group.members} participants</p>
                      <p>Next session: {group.nextSession}</p>
                      <div className="group-actions">
                        <button>Join Session</button>
                        <button>View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="notifications-container">
                <h2>Notifications</h2>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification ${notification.unread ? 'unread' : ''}`}
                    >
                      <p>{notification.content}</p>
                      <span className="notification-time">{notification.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CommunicationTools;