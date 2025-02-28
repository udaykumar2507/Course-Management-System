import React from 'react';
import Navbar from '../components/navbar';
import './About.css'; 
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate=useNavigate()
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1 className="about-heading">About <span className="highlight">EduLoom</span></h1>
        <p className="about-subheading">Empowering Learners, Transforming Futures</p>
        <p className="about-description">
          At <strong>EduLoom</strong>, we believe that education should be accessible, engaging, and tailored to meet the needs of learners everywhere. 
          Our platform brings together expert instructors, cutting-edge courses, and a community of passionate learners who are driven by curiosity and ambition.
        </p>
        <p className="about-description">
          <strong>Our Mission:</strong> To bridge the gap between knowledge and opportunity by providing high-quality education that equips learners with the skills needed for the future.
        </p>
        <p className="about-description">
          <strong>Why Choose Us?</strong> Flexible schedules, industry-relevant courses, and mentorship that matters — all designed to help you achieve your learning goals anytime, anywhere.
        </p>
        <button className="explore-btn" onClick={()=>navigate('/courses')}>
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default About;
