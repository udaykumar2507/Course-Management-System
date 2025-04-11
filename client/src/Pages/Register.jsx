// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role },{withCredentials:true});
      alert('Registration Successful');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <h2 className="register-heading">Create Your <span className="highlight">EduLoom</span> Account 🚀</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" autoComplete="current-password" required value={name} onChange={(e) => setName(e.target.value)} className="register-input" />
          <input type="email" placeholder="Email Address" autoComplete="current-password" required value={email} onChange={(e) => setEmail(e.target.value)} className="register-input" />
          <input type="password" placeholder="Password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="register-input" />
          <input type="password" placeholder="Confirm Password" autoComplete="current-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="register-input" />
          <label className="register-label">Select Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="register-input">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
