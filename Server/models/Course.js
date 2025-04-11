const mongoose = require('mongoose');
require('./User'); // Assuming your User model is already defined

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  coursethumbnail: {
    url: { type: String },        // Hosted URL
    public_id: { type: String },  // Cloudinary ID (if needed for deletion)
  },

  video_demo: {
    url: { type: String },        // Hosted URL (Cloudinary/S3)
   
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
