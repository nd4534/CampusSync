// config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/college_help"); 
    // If you want cloud MongoDB Atlas, replace the URL here
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectDB;