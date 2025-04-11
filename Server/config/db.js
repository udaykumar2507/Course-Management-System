
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // or process.env.MONGO_URI (match with .env)
    
    if (!uri) {
      throw new Error("MongoDB URI is undefined. Check your .env file.");
    }

    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
