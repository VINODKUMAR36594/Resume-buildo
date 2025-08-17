import React, { useState, useContext } from 'react';
import { authStyles as styles } from '../assets/dummystyle';
import { UserContext } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import { Input } from './Inputs.jsx'; // Ensure correct import

const Signup = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) return setError('Full name is required');
    if (!validateEmail(email)) return setError('Please enter a valid email address');
    if (!password) return setError('Password is required');

    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during signup');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupTitle}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
      </div>

      <form onSubmit={handleSignUp} className={styles.signupForm}>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
          required
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Email@example.com"
          type="email"
          required
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Password"
          type="password"
          required
        />
        {error && (
          <p className={styles.errorMessage} aria-live="polite">
            {error}
          </p>
        )}
        <button type="submit" className={styles.signupSubmit}>
          Create Account
        </button>
        {/* Footer */}
        <p className={styles.switchText}>
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('login')}
            type="button"
            className={styles.signupSwitchButton}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;