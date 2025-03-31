import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';

export default function Signup() {
  const [showSignup, setShowSignup] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8 || !/\d/.test(value) || !/[A-Z]/.test(value)) {
      setPasswordError('Password must be at least 8 characters long, include a number and an uppercase letter.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordValid = password === confirmPassword && passwordError === '';

  return (
    <>
      {showSignup && (
        <div className='signup-modal' onClick={() => setShowSignup(false)}>
          <div className='signup-container' onClick={(e) => e.stopPropagation()}>
            <span className='close-icon' onClick={() => setShowSignup(false)}>&times;</span>
            <h2 className='signup-title'>Sign Up</h2>
            <input type='text' placeholder='First Name' required />
            <input type='text' placeholder='Last Name' required />
            <input type='email' placeholder='Email' required />
            <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} required />
            {passwordError && <p className='error-text'>{passwordError}</p>}
            <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} required />
            {!isPasswordValid && <p className='error-text'>Passwords do not match</p>}
            <div className='terms-container'>
              <input type='checkbox' id='terms' required />
              <label htmlFor='terms'>I accept the terms and conditions</label>
            </div>
            <button disabled={!isPasswordValid} className='signup-button'>Sign Up</button>
            <p>Already have an account? <Link to='/login' onClick={() => setShowSignup(false)}><span>Login</span></Link></p>
          </div>
        </div>
      )}
    </>
  );
}
