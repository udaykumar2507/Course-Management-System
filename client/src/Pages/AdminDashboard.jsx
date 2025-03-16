import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          withCredentials: true,
        });
        const coursesRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/courses`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(usersRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error('Error fetching admin data', err);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.role}</li>
        ))}
      </ul>
      <h3>Courses</h3>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.title} - {course.instructor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;