// routes/admin.js
const express = require("express");
const router = express.Router();

/**
 * NOTE: For this to work without a database, you must define 
 * global.complaints = []; 
 * in your main app.js file.
 */

// 1. Admin Login (Hardcoded Credentials)
router.post("/login", (req, res) => {
  try {
    const { adminId, password } = req.body;

    // Fixed credentials for PTU Help Desk Admin
    if (adminId === "admin_ptu" && password === "admin123") {
      return res.json({ 
        message: "Admin Access Granted", 
        role: "admin",
        token: "admin-session-xyz" // Mock token
      });
    } else {
      return res.status(401).json({ message: "Invalid Admin ID or Password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error during admin login" });
  }
});

// 2. Get All Student Complaints
router.get("/all-complaints", (req, res) => {
  try {
    // Access the global array shared with user.js
    const allComplaints = global.complaints || [];
    
    // Sort by upvotes so the most important issues are at the top
    const sortedComplaints = [...allComplaints].sort((a, b) => b.upvotes - a.upvotes);
    
    return res.json(sortedComplaints);
  } catch (err) {
    return res.status(500).json({ message: "Could not fetch complaints" });
  }
});

// 3. Update Complaint Status (Resolve/In-Progress)
router.patch("/update-status/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body; // Expecting "Resolved", "In Progress", or "Rejected"

    if (!global.complaints) {
      return res.status(404).json({ message: "No complaints found" });
    }

    // Find the complaint by the Token ID (Timestamp)
    const complaintIndex = global.complaints.findIndex(c => c.id == id);

    if (complaintIndex !== -1) {
      global.complaints[complaintIndex].status = newStatus;
      return res.json({ 
        message: `Status updated to ${newStatus}`, 
        updatedComplaint: global.complaints[complaintIndex] 
      });
    } else {
      return res.status(404).json({ message: "Complaint ID not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error updating complaint status" });
  }
});

// 4. Delete Spam/Duplicate Complaints
router.delete("/delete-complaint/:id", (req, res) => {
  try {
    const { id } = req.params;
    const initialLength = global.complaints.length;
    
    global.complaints = global.complaints.filter(c => c.id != id);
    
    if (global.complaints.length < initialLength) {
      return res.json({ message: "Complaint deleted successfully" });
    } else {
      return res.status(404).json({ message: "Complaint not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error deleting complaint" });
  }
});

module.exports = router;