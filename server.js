const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// --- 1. INITIALIZE GLOBAL DATA (The "No-Database" Solution) ---
// These arrays act as your database. They share data between all route files.
global.users = [
  { rollNumber: "101", password: "password123", userType: "existing" }
];
global.complaints = [
  { id: 1, rollNumber: "101", title: "Library AC", description: "Not working", status: "Pending", upvotes: 5 }
];

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- 2. ROUTES IMPORT ---
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const chatbotRoutes = require("./routes/chatbot"); // Imported Chatbot Route

// --- 3. ROUTES INTEGRATION ---
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chatbot", chatbotRoutes); // Integrated Chatbot Route

// Test Route
app.get("/", (req, res) => {
  res.send("CampusSync Backend is running (No-DB Mode) with Chatbot!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 All systems active: User, Admin, and Chatbot.`);
});
// Run this once to fill your DB
const Chatbot = require("./models/Chatbot");
Chatbot.create([
  { keywords: ["datesheet", "exam"], answer: "Datesheets are usually out 2 weeks before exams on the PTU portal." },
  { keywords: ["fee", "fine"], answer: "Pay fees at the Block A accounts window." }
]);
const Chatbot = require("./models/Chatbot");
app.get("/seed-bot", async (req, res) => {
  await Chatbot.create({ 
    keywords: ["fee", "fine", "payment"], 
    answer: "Pay your fees at the Block A accounts window." 
  });
  res.send("Bot seeded!");
});
