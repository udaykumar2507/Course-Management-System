const Course = require('../models/Course');
const User=require('../models/User');
const cloudinary = require('../utils/cloudinary');


exports.getAllCourses = async (req, res) => {
  try {
    console.log("Fetching all courses...");
    const courses = await Course.find().populate({
      path: 'instructor',
      select: 'name',
      options: { strictPopulate: false },
    });
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: "Error fetching courses", error: err.message });
  }
};


exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).populate('enrolledStudents', 'name email');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch instructor courses' });
  }
};


exports.addCourse = async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const newCourse = await Course.create({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add course', error: err.message });
  }
};


exports. enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();
    res.status(200).json({ message: 'Successfully enrolled in course' });
  } catch (err) {
    res.status(500).json({ message: 'Enrollment failed' });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user._id;
    const courses = await Course.find({ enrolledStudents: studentId }).populate('instructor', 'name');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enrolled courses', error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
};


exports.getUserDetail=async (req,res)=>{
  try{
    const user=req.user;
    res.status(200).json({user});
  }catch(error){
    res.status(400).json({message:"Unable to Fetch User Deatil"})
  }
}


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const {
      name,
      email,
      role,
      location,
      college,
      githubId,
      twitterId,
      linkedinId
    } = req.body;

  
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (location) user.location = location;
    if (college) user.college = college;
    if (githubId) user.githubId = githubId;
    if (twitterId) user.twitterId = twitterId;
    if (linkedinId) user.linkedinId = linkedinId;

    // Handle new profile photo if uploaded
    if (req.file) {
      // If previous photo exists, delete from cloudinary
      if (user.profilephoto && user.profilephoto.public_id) {
        await cloudinary.uploader.destroy(user.profilephoto.public_id);
      }

      user.profilephoto = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while updating profile' });
  }
};