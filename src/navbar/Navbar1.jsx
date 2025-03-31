import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
    // Initialize dark mode state based on localStorage or system preference
    const [darkMode, setDarkMode] = useState(() => {
        // Check if user has previously set a preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            return JSON.parse(savedMode);
        }
        // Otherwise check for system preference
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // States for dropdown menus - consolidated to one place
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    // Refs for dropdown containers
    const notificationRef = useRef(null);
    const messageRef = useRef(null);
    const bookingsRef = useRef(null);
    const profileRef = useRef(null);

    // Mock data for notifications
    const notifications = [
        {
            id: 1,
            message: "Your session is scheduled for tomorrow",
            time: "2 hours ago"
        },
        {
            id: 2,
            message: "New resource added to your library",
            time: "Yesterday"
        },
        {
            id: 3,
            message: "Complete your profile to get personalized recommendations",
            time: "3 days ago"
        }
    ];

    // Mock data for bookings
    const bookings = [
      { title: "Speech Therapy - Session 1", time: "Paid - $50", date: "Today" },
      { title: "Speech Therapy - Session 2", time: "Paid - $50", date: "Yesterday" },
      { title: "Speech Therapy - Session 3", time: "Pending Payment", date: "3 days ago" },
      { title: "Speech Therapy - Session 4", time: "Refunded - $50", date: "Last Week" },
    ];

    // Effect to apply dark mode to the entire website
    useEffect(() => {
        // Apply dark mode class to document body
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Save preference to localStorage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    // Close dropdowns when clicking outside - consolidated all dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (messageRef.current && !messageRef.current.contains(event.target)) {
                setShowMessages(false);
            }
            if (bookingsRef.current && !bookingsRef.current.contains(event.target)) {
                setShowBookings(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    // Toggle dropdown functions - improved to close other dropdowns
    const toggleNotifications = (e) => {
        e.stopPropagation();
        setShowNotifications(!showNotifications);
        setShowMessages(false);
        setShowBookings(false);
        setShowProfile(false);
    };

    const toggleMessages = (e) => {
        e.stopPropagation();
        setShowMessages(!showMessages);
        setShowNotifications(false);
        setShowBookings(false);
        setShowProfile(false);
    };
    
    const toggleBookings = (e) => {
        e.stopPropagation();
        setShowBookings(!showBookings);
        setShowNotifications(false);
        setShowMessages(false);
        setShowProfile(false);
    };
    
    const toggleProfile = (e) => {
        e.stopPropagation();
        setShowProfile(!showProfile);
        setShowNotifications(false);
        setShowMessages(false);
        setShowBookings(false);
    };

    return (
        <div className='navbar-container'>
            <div className='navbar-content'>
                <Link to="/home">
                    <div className='logo'>
                        Logo
                    </div>
                </Link>
                <div className='navbar-right'>
                    <div className='search-container'>
                        <input type="text" placeholder='What services are you looking for?' className='search-input' />
                        <button className='search-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className='icon-container'>
                        {/* Notification icon with dropdown */}
                        <div className="notification-wrapper" ref={notificationRef}>
                            <div className="notification-icon-container" onClick={toggleNotifications}>
                                <img
                                    src="https://img.icons8.com/?size=100&id=nJRLlq8KqcX5&format=png&color=000000"
                                    alt="Notification"
                                    className='nav-icon'
                                />
                                <span className="notification-badge">3</span>
                            </div>

                            {showNotifications && (
                                <div className="notification-dropdown">
                                    <div className="notification-header">
                                        <h3>Notifications (3)</h3>
                                    </div>

                                    <div className="notification-list">
                                        {notifications.map(notification => (
                                            <div key={notification.id} className="notification-item">
                                                <div className="notification-content">
                                                    <p className="notification-message">{notification.message}</p>
                                                    <span className="notification-time">{notification.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Message icon with badge */}
                        <div className="message-wrapper" ref={messageRef}>
                            <div className="message-icon-container" onClick={toggleMessages}>
                                <img
                                    src="https://img.icons8.com/?size=100&id=5297&format=png&color=000000"
                                    alt="Message"
                                    className='nav-icon'
                                />
                                <span className="message-badge">2</span>
                            </div>

                            {showMessages && (
                                <div className="message-dropdown">
                                    <div className="message-header">
                                        <h3>Messages (2)</h3>
                                    </div>

                                    <div className="message-list">
                                        <div className="message-item">
                                            <img
                                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                alt="Profile"
                                                className="message-avatar"
                                            />
                                            <div className="message-content">
                                                <h4 className="message-sender">Dr. Sarah Johnson</h4>
                                                <p className="message-text">Looking forward to our session tomorrow!</p>
                                                <span className="message-time">1 hour ago</span>
                                            </div>
                                        </div>
                                        <div className="message-item">
                                            <img
                                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                alt="Profile"
                                                className="message-avatar"
                                            />
                                            <div className="message-content">
                                                <h4 className="message-sender">Support Team</h4>
                                                <p className="message-text">Your subscription has been renewed successfully</p>
                                                <span className="message-time">Yesterday</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bookings dropdown */}
                        <div className="nav-item" ref={bookingsRef}>
                            <button className="nav-icon-button" onClick={toggleBookings}>
                                <img
                                    src="https://img.icons8.com/?size=100&id=6904&format=png&color=000000"
                                    alt="Bookings"
                                    className="nav-icon"
                                />
                            </button>

                            {showBookings && (
                                <div className="dropdown">
                                    <h4 className="dropdown-title">Bookings & Payments</h4>
                                    {bookings.map((booking, index) => (
                                        <div key={index}>
                                            <div className="dropdown-item">
                                                <strong>{booking.title}</strong>
                                                <p className="dropdown-time">{booking.time}</p>
                                                <span className="dropdown-date">{booking.date}</span>
                                            </div>
                                            {index < bookings.length - 1 && <hr />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Dark mode toggle button */}
                        <button
                            onClick={toggleDarkMode}
                            className='dark-mode-toggle'
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>

                    {/* Profile dropdown */}
                    <div className="profile-container" ref={profileRef}>
                        <button className="login-button1" onClick={toggleProfile}>
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                alt="Profile"
                                className="profile-image"
                            />
                        </button>

                        {showProfile && (
                            <div className="dropdown profile-dropdown">
                                <a href="/update" className="dropdown-item">Update profile</a>
                                <hr/>
                                <a href="/settings" className="dropdown-item">Settings</a>
                                <hr />
                                <a href="/" className="dropdown-item">Logout</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <hr className='divider' />
            <nav className='navigation'>
                <ul className='nav-menu'>
                    <li className='nav-item'><Link to="/therapyservices">Therapy Services</Link></li>
                    <li className='nav-item'><Link to="/therapyScheduling">Schedule a Session</Link></li>
                    <li className='nav-item'><Link to="/resourcelib">Resources</Link></li>
                    <li className='nav-item'><Link to="/progress">Progress Tracking</Link></li>
                    <li className='nav-item'><Link to="/speech">Exercises</Link></li>  
                    <li className='nav-item'><Link to="/communicate">Communicate</Link></li>   
                    <li className='nav-item'><Link to="/reviewrate">Reviews and Ratings</Link></li>    
                    <li className='nav-item'><Link to='/subscribe'>Subscription</Link></li>   
                    <li className='nav-item'><Link to='/help'>Help</Link></li>
                </ul>
            </nav>
            <hr className='divider' />
        </div>
    );
};

export default Navbar1;