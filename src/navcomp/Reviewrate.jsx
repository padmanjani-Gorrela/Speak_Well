import React, { useState } from 'react';
import './Reviewrate.css'; // Import the CSS Module

const Reviewrate = () => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment && rating) {
            const newReview = { rating, comment };
            setReviews((prevReviews) => [...prevReviews, newReview]);
            setComment('');
            setRating(0);
        }
    };

    return (
        <div className={styles.reviewsContainer}>
            <h1>Leave a Review</h1>
            <form onSubmit={handleSubmit} className={styles.reviewForm}>
                <div className={styles.rating}>
                    <label>Rating:</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="0">Select Rating</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>{star}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.comment}>
                    <label>Comment:</label>
                    <textarea
                        className={styles.textarea}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Submit Review</button>
            </form>
            <div className={styles.reviewsList}>
                <h2>Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((review, index) => (
                        <div key={index} className={styles.review}>
                            <p><strong>Rating:</strong> {review.rating}</p>
                            <p><strong>Comment:</strong> {review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviewrate;