import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Navbar from '../components/navbar';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  
  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses/instructor', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses', err);
      }
    };
    fetchInstructorCourses();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/courses/add', {
        title, description, price
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      alert('Course added successfully!');
      setCourses(prevCourses => [...prevCourses, res.data]);  
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (err) {
      console.error('Error adding course', err);
      alert(err.response?.data?.message || 'Failed to add course');
    }
  };
  
  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert('Course deleted successfully!');
      setCourses(courses.filter(course => course._id !== courseId)); // ✅ Remove from UI
    } catch (error) {
      console.error('Error deleting course:', error.response?.data || error.message);
    }
  };
  
  return (
    <>
      <Navbar/>
      <div className="dashboard-container">
        <h2 className="dashboard-heading">My Created Courses</h2>
        <form className="course-form" onSubmit={handleAddCourse}>
          <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="course-input" />
          <input type="text" placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="course-input" />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="course-input" />
          <button type="submit" className="add-course-btn">Add Course</button>
        </form>
        <div className="courses-list">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <p><strong>Students Enrolled:</strong> {course.enrolledStudents.length}</p>
              <button onClick={() => handleDeleteCourse(course._id)} className="delete-btn">❌ Delete Course</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InstructorDashboard;
