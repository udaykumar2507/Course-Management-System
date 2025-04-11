const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student','admin','instructor'],
    default: 'student',
  },
  profilephoto: {
    url: {
      type: String,
      default: 'https://i.pinimg.com/736x/54/d0/69/54d069e2b96f5d6ccc7f8e363270f514.jpg',
    },
    public_id: {
      type: String,
      default: '',
    },
  },
  location: { 
  type: String, default: 'Not specified' },
  college: { type: String, default: 'Not specified' },
  githubId: { type: String, default: '' },
  twitterId: { type: String, default: '' },
  linkedinId: { type: String, default: '' },
  enrolledCourses: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  ],
});


const User = mongoose.model('users', userSchema);

module.exports = User;
