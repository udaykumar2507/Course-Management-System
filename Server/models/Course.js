const mongoose = require('mongoose');
require('./User'); 

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
