const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

require('./models/User');  
require('./models/Course');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

dotenv.config();
connectDB();

const app = express();


const allowedOrigins = [
  'http://localhost:5173',
  'https://course-management-system-r82o.vercel.app'
];


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};


app.use(cors({
  origin: '*',
  credentials: true
}));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
