import React from 'react';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1 className="home-heading">Welcome to <span className="highlight">EduLoom</span></h1>
        <p className="home-subheading">Shaping the Future of Learning</p>
        <p className="home-slogan">
          Join thousands of learners on their journey to success. <br />
          Learn the skills that matter, anytime, anywhere.
        </p>
        <button className="get-started-btn" onClick={() => navigate('/courses')}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
