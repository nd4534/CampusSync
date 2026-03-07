const mongoose = require("mongoose");
const User = require("./models/User"); // Make sure path is correct

// 1️⃣ Connect to MongoDB (no extra options)
mongoose.connect("mongodb://127.0.0.1:27017/college_help_backend")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 2️⃣ List of existing students
const students = [
  { rollNumber: "12345", password: "pass123", userType: "existing" },
  { rollNumber: "54321", password: "mypassword", userType: "existing" },
  { rollNumber: "11111", password: "abc123", userType: "existing" },
  { rollNumber: "22222", password: "xyz456", userType: "existing" },
  { rollNumber: "33333", password: "hello123", userType: "existing" }
];

// 3️⃣ Function to add students
async function addStudents() {
  try {
    for (const student of students) {
      let exists = await User.findOne({ rollNumber: student.rollNumber });
      if (!exists) {
        await User.create(student);
        console.log(`✅ Added student: ${student.rollNumber}`);
      } else {
        console.log(`ℹ️ Student already exists: ${student.rollNumber}`);
      }
    }
  } catch (err) {
    console.error("❌ Error adding students:", err);
  } finally {
    mongoose.connection.close();
  }
}

// 4️⃣ Run the function
addStudents();