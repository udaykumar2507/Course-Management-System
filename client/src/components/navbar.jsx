import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>EduLoom</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/about">About</Link></li>
        {token ? (
          <>
            {role === 'student' && <li><Link to="/student-dashboard">Dashboard</Link></li>}
            {role === 'instructor' && <li><Link to="/instructor-dashboard">Dashboard</Link></li>}
            {role === 'superadmin' && <li><Link to="/admin-dashboard">Admin</Link></li>}
            <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>Logout</li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;