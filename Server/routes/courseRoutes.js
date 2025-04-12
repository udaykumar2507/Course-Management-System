const express = require('express');
const { protect, authorize } = require('../middleware/authmiddlware');
const upload = require('../middleware/multer');
const { updateProfile } = require('../controllers/coursecontrollers');
const { getAllCourses, getInstructorCourses, enrollCourse, addCourse,getEnrolledCourses,deleteCourse,getUserDetail } = require('../controllers/coursecontrollers');

const router = express.Router();

router.get('/', getAllCourses); 
router.get('/student/courses', protect, authorize('student'), getEnrolledCourses);
router.get('/instructor', protect, authorize('instructor'), getInstructorCourses);
router.post('/add', protect, authorize('instructor'), addCourse);
router.post('/enroll/:id', protect, authorize('student'), enrollCourse);
router.delete('/:id', protect, authorize('instructor'), deleteCourse);
router.get('/getstudentdetail',protect,getUserDetail);
router.put('/update-profile',protect,upload.single('profilePhoto'), updateProfile);


module.exports = router;