
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password },{withCredentials:true});
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      alert('Login Successful');
      navigate(res.data.role === 'superadmin' ? '/admin-dashboard' : '/courses');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2 className="login-heading">Welcome Back to <span className="highlight">EduLoom</span>👋</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required value={email}  autoComplete="current-password" onChange={(e) => setEmail(e.target.value)} className="login-input" />
          <input type="password" placeholder="Password" required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} className="login-input" />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
          <p className="register-link">
          Don't have an account? <span onClick={() => navigate('/register')}>Register Now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;


