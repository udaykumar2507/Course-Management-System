import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Navbar from '../components/navbar';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses/student/courses`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials:true,
      });

      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching enrolled courses:', err.response?.data || err.message);
    }
  };

  fetchEnrolledCourses();

  window.addEventListener('courseEnrolled', fetchEnrolledCourses);
  return () => window.removeEventListener('courseEnrolled', fetchEnrolledCourses);
}, []);

  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      <h2 className="dashboard-heading">My Enrolled Courses</h2>
      <div className="courses-list">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default StudentDashboard;