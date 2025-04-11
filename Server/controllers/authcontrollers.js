const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registerUser = async (req, res) => {
  console.log("Request body:", req.body);
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();


    console.log("Created user object:", user);

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilephoto: user.profilephoto,
        location: user.location,
        college: user.college,
        githubId: user.githubId,
        twitterId: user.twitterId,
        linkedinId: user.linkedinId,
        enrolledCourses: user.enrolledCourses,
      }
    });
  } catch (err) {
    console.error("Registration failed error:", err.message);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
