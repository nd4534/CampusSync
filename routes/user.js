// routes/user.js
const express = require("express");
const router = express.Router();

// Mock Databases (Arrays)
let users = [
  { rollNumber: "101", password: "password123", userType: "existing" }
];

let complaints = [
  { id: 1710123456789, rollNumber: "101", title: "WiFi Issue", description: "No signal in Block B", status: "Resolved", upvotes: 2 }
];

// --- LOGIN ROUTE ---
router.post("/login", async (req, res) => {
  try {
    const { rollNumber, password } = req.body;

    if (!rollNumber || !password) {
      return res.status(400).json({ message: "Roll number and password required" });
    }

    // Check if new student
    if (rollNumber.startsWith("newStudent@")) {
      const cleanRoll = rollNumber.replace("newStudent@", "");

      let existingUser = users.find(u => u.rollNumber === cleanRoll);
      
      if (!existingUser) {
        const newUser = {
          rollNumber: cleanRoll,
          password: password,
          userType: "new"
        };
        users.push(newUser); 
      }
      return res.json({ userType: "new", rollNumber: cleanRoll });
    }

    // Existing student check
    let user = users.find(u => u.rollNumber === rollNumber);
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.json({ userType: "existing", rollNumber: user.rollNumber });

  } catch (err) {
    console.error("User login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// --- COMPLAINT ROUTES ---

// 1. Submit a new complaint
router.post("/complain", (req, res) => {
  try {
    const { rollNumber, title, description } = req.body;

    if (!rollNumber || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = {
      id: Date.now(), // Unique Token ID based on timestamp
      rollNumber,
      title,
      description,
      status: "Pending",
      upvotes: 0
    };

    complaints.push(newComplaint);
    return res.json({ message: "Complaint raised successfully!", token: newComplaint.id });

  } catch (err) {
    return res.status(500).json({ message: "Error submitting complaint" });
  }
});

// 2. View history for a specific student
router.get("/my-history/:rollNumber", (req, res) => {
  try {
    const { rollNumber } = req.params;
    const userHistory = complaints.filter(c => c.rollNumber === rollNumber);
    
    return res.json(userHistory);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching history" });
  }
});

module.exports = router;