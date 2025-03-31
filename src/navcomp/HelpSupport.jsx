import React, { useState } from "react";
import Navbar from "../navbar/Navbar1";
import "./HelpSupport.css"; // Assuming you have a CSS file for styles

const HelpSupport = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFeedback("");
      setSubmitted(false);
    }, 3000);
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#846005",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    section: {
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #846005",
      borderRadius: "8px",
    },
    button: {
      backgroundColor: "#846005",
      color: "white",
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
      borderRadius: "5px",
    },
    input: {
      width: "94%",
      padding: "10px",
      border: "1px solid #846005",
      borderRadius: "5px",
      marginTop: "10px",
    },
    responsive: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <h2>Help & Support</h2>
      
     

      <div style={styles.section}>
        <h3>Contact Support</h3>
        <p>Email: <a href="mailto:support@example.com" style={{ color: "#846005" }}>support@example.com</a></p>
        <p>Phone: <a href="tel:+1234567890" style={{ color: "#846005" }}>+123 456 7890</a></p>
      </div>
      
      <div style={styles.section}>
        <h3>Feedback</h3>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            style={styles.input}
            rows="4"
            placeholder="Share your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <br />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
        {submitted && <p style={{ color: "green" }}>Feedback submitted successfully!</p>}
      </div>
    </div>
    </>
  );
};

export default HelpSupport;