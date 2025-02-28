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
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.listen(process.env.PORT, () => console.log(`🚀 Server running on ${process.env.PORT}`));
