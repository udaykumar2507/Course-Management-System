const express = require('express');
const { protect, authorize } = require('../middleware/authmiddlware');
const { getAllCourses, getInstructorCourses, enrollCourse, addCourse,getEnrolledCourses,deleteCourse } = require('../controllers/coursecontrollers');

const router = express.Router();

router.get('/', getAllCourses); 
router.get('/student/courses', protect, authorize('student'), getEnrolledCourses);
router.get('/instructor', protect, authorize('instructor'), getInstructorCourses);
router.post('/add', protect, authorize('instructor'), addCourse);
router.post('/enroll/:id', protect, authorize('student'), enrollCourse);
router.delete('/:id', protect, authorize('instructor'), deleteCourse);


module.exports = router;