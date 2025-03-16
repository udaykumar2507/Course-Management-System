import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import CourseCard from '../components/coursecard';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      console.log("Fetching courses...");
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses`, {
        withCredentials: true
      });

      console.log("Courses received:", res.data);
      setCourses(res.data);
    } catch (error) {
      console.error("Axios Error:", error.response?.status);  
      console.error("Error Message:", error.response?.data);
    }
  };

  fetchCourses();
}, []);


  return (
    <div>
      <Navbar />
      <div className="courses-container">
        <h1 className="courses-heading">Explore Our <span>Courses</span></h1>
        <p className="courses-subheading">Choose from a variety of courses designed to enhance your skills.</p>
        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;