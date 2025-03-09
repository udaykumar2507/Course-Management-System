const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

require('./models/User');  
require('./models/Course');

const authRoutes = require('./routes/AuthRoutes');
const courseRoutes = require('./routes/CourseRoutes');



dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'https://course-management-system-r82o.vercel.app/', 
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);


const PORT=process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
