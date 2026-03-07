// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["new", "existing"], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);