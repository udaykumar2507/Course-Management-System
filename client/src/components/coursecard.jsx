import img1 from '../assets/luffy.jpeg';
import img2 from '../assets/boys.webp';
import img3 from '../assets/deadpool.jpeg';
import img4 from '../assets/GOT.webp';
import img5 from '../assets/gotham.webp';
import img6 from '../assets/marvel.webp';
import img7 from '../assets/one piece.webp';
import img8 from '../assets/superman.avif';

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './coursecard.css';

const defaultThumbnails = [img1, img2, img3, img4,img5,img6,img7,img8];

const getRandomThumbnail = () => {
  return defaultThumbnails[Math.floor(Math.random() * defaultThumbnails.length)];
};

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to enroll in a course');
        navigate('/login');
        return;
      }

      console.log("Enrolling in course:", course._id); 

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/courses/enroll/${course._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Successfully enrolled!');
      window.dispatchEvent(new Event('courseEnrolled'));
    } catch (error) {
      console.error('Enrollment failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="course-card">
      <img src={course.image || getRandomThumbnail()} alt="Course Thumbnail" className="course-image" />
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="instructor-name">Instructor: <span>{course.instructor?.name || 'Unknown'}</span></p>
        <p className="course-price">Price: <span>₹{course.price}</span></p>
        <button className="enroll-btn" onClick={handleEnroll}>Enroll Now</button>
      </div>
    </div>
  );
};

export default CourseCard;
