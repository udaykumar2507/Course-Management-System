import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/privateroute';
import Navbar from './components/navbar';
import Home from './pages/HomePage';
import About from './pages/About';
import Courses from './pages/Courses'
import Login from './Pages/Login';
import Register from './Pages/Register';
import StudentDashboard from './Pages/StudentDashboard';
import InstructorDashboard from './Pages/InstructorDashboard';
import AdminDashboard from './Pages/AdminDashboard';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/student-dashboard" element={<PrivateRoute allowedRoles={["student"]} />}> <Route index element={<StudentDashboard />} /> </Route>
        <Route path="/instructor-dashboard" element={<PrivateRoute allowedRoles={["instructor"]} />}> <Route index element={<InstructorDashboard />} /> </Route>
        <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={["superadmin"]} />}> <Route index element={<AdminDashboard />} /> </Route>
      </Routes>
    </>
  );
};

export default App;
