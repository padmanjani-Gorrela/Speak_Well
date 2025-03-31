// TherapyReviews.jsx
import React, { useState, useEffect } from 'react';
import './TherapyReviews.css';
import Navbar from '../navbar/Navbar1';

const TherapyReviews = () => {
  // Initial sample reviews
  const initialReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2025-03-15",
      therapistName: "Dr. Michelle Wong",
      title: "Excellent results with articulation therapy",
      content: "My 7-year-old son has made incredible progress with Dr. Wong's articulation therapy sessions. After just 2 months, his pronunciation has improved dramatically and his confidence has soared. The exercises provided through the app have been engaging and effective for daily practice.",
      avatar: "S",
      helpful: 12,
      isVerified: true
    },
    {
      id: 2,
      name: "Robert Martinez",
      rating: 4,
      date: "2025-03-10",
      therapistName: "Thomas Lewis, SLP",
      title: "Great fluency improvement program",
      content: "As an adult who's struggled with stuttering for years, I was skeptical about online therapy. However, the structured approach and consistent feedback have helped me make real progress. The progress tracking features are motivating, and the video exercises are clear and well-explained.",
      avatar: "R",
      helpful: 8,
      isVerified: true
    },
    {
      id: 3,
      name: "Emily Chen",
      rating: 5,
      date: "2025-03-05",
      therapistName: "Voice Recovery Program",
      title: "Voice therapy after surgery",
      content: "Following vocal cord surgery, I needed specialized therapy to regain my speaking voice for my teaching career. The voice therapy program was perfectly tailored to my needs, with graduated exercises that helped me rebuild strength safely. The ability to record and analyze my voice within the app was invaluable.",
      avatar: "E",
      helpful: 15,
      isVerified: true
    }
  ];

  // State management
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    therapistName: "",
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes for the new review form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  // Handle rating selection
  const handleRatingSelect = (rating) => {
    setNewReview({
      ...newReview,
      rating
    });
  };

  // Submit new review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!newReview.name || !newReview.therapistName || !newReview.title || !newReview.content || newReview.rating === 0) {
      alert("Please fill in all fields and provide a rating");
      return;
    }
    
    // Create new review object
    const reviewToAdd = {
      ...newReview,
      id: reviews.length + 1,
      avatar: newReview.name.charAt(0),
      helpful: 0,
      isVerified: true
    };
    
    // Add to reviews list
    setReviews([reviewToAdd, ...reviews]);
    
    // Reset form
    setNewReview({
      name: "",
      rating: 0,
      therapistName: "",
      title: "",
      content: "",
      date: new Date().toISOString().split('T')[0]
    });
    
    // Show success message
    setSuccessMessage("Your review has been submitted successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Mark review as helpful
  const handleMarkHelpful = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, helpful: review.helpful + 1 } : review
    ));
  };

  // Filter reviews based on rating
  const filteredReviews = () => {
    if (filter === "all") return reviews;
    return reviews.filter(review => review.rating === parseInt(filter));
  };

  // Sort filtered reviews
  const sortedReviews = () => {
    const filtered = filteredReviews();
    
    switch (sort) {
      case "newest":
        return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
      case "oldest":
        return [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
      case "highest":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "lowest":
        return [...filtered].sort((a, b) => a.rating - b.rating);
      case "mostHelpful":
        return [...filtered].sort((a, b) => b.helpful - a.helpful);
      default:
        return filtered;
    }
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Calculate rating distribution
  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    
    return distribution;
  };

  // Render star ratings
  const renderStars = (rating, interactive = false) => {
    return (
      <div className={`stars-container ${interactive ? 'interactive' : ''}`}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= (interactive ? hoveredRating || newReview.rating : rating) ? 'filled' : ''}`}
            onMouseEnter={interactive ? () => setHoveredRating(star) : null}
            onMouseLeave={interactive ? () => setHoveredRating(0) : null}
            onClick={interactive ? () => handleRatingSelect(star) : null}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const ratingDistribution = calculateRatingDistribution();
  const totalReviews = reviews.length;

  return (
    <>
      <Navbar />
      <div className="therapy-reviews-container">
        <header className="reviews-header">
          <h1>Speech Therapy Reviews & Ratings</h1>
          <p>Read what our clients say about their therapy experience</p>
        </header>

        <div className="reviews-content">
          <section className="reviews-summary">
            <div className="average-rating">
              <h2>{calculateAverageRating()}</h2>
              {renderStars(calculateAverageRating())}
              <p>{totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
            </div>
            
            <div className="rating-distribution">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="rating-bar">
                  <span className="rating-label">{rating} Star</span>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ 
                        width: `${totalReviews ? (ratingDistribution[rating] / totalReviews) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="rating-count">{ratingDistribution[rating]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="write-review">
            <h2>Share Your Experience</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form onSubmit={handleSubmitReview}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newReview.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="therapistName">Therapist or Service</label>
                  <input
                    type="text"
                    id="therapistName"
                    name="therapistName"
                    value={newReview.therapistName}
                    onChange={handleInputChange}
                    placeholder="Enter therapist name or service"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Your Rating</label>
                {renderStars(newReview.rating, true)}
              </div>
              
              <div className="form-group">
                <label htmlFor="title">Review Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newReview.title}
                  onChange={handleInputChange}
                  placeholder="Summarize your experience"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="content">Your Review</label>
                <textarea
                  id="content"
                  name="content"
                  value={newReview.content}
                  onChange={handleInputChange}
                  placeholder="Share details of your therapy experience to help others"
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Submit Review</button>
            </form>
          </section>

          <section className="reviews-list">
            <div className="reviews-controls">
              <div className="filter-control">
                <label htmlFor="filter">Filter:</label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              
              <div className="sort-control">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="mostHelpful">Most Helpful</option>
                </select>
              </div>
            </div>

            <h2>Client Reviews</h2>
            
            {sortedReviews().length === 0 ? (
              <div className="no-reviews">
                <p>No reviews match your current filter. Try adjusting your filters or be the first to leave a review!</p>
              </div>
            ) : (
              <div className="reviews-grid">
                {sortedReviews().map(review => (
                  <div className="review-card" key={review.id}>
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="avatar">{review.avatar}</div>
                        <div className="reviewer-details">
                          <h3>{review.name}</h3>
                          <div className="review-meta">
                            {review.isVerified && <span className="verified-badge">Verified Client</span>}
                            <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    
                    <div className="review-body">
                      <h4>{review.title}</h4>
                      <p className="therapist-name">Therapist/Service: {review.therapistName}</p>
                      <p className="review-content">{review.content}</p>
                    </div>
                    
                    <div className="review-footer">
                      <button 
                        className="helpful-button"
                        onClick={() => handleMarkHelpful(review.id)}
                      >
                        <span className="helpful-icon">👍</span>
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default TherapyReviews;