const express = require("express");
const router = express.Router();
const Chatbot = require("../models/Chatbot"); // Import the model

router.post("/query", async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();
    
    // Fetch all Q&A pairs from MongoDB
    const knowledgeBase = await Chatbot.find();

    // Find a match based on keywords
    const match = knowledgeBase.find(item => 
      item.keywords.some(keyword => userMessage.includes(keyword.toLowerCase()))
    );

    if (match) {
      res.json({ reply: match.answer });
    } else {
      res.json({ 
        reply: "I'm not sure about that. Would you like to raise an official complaint?",
        suggestComplaint: true 
      });
    }
  } catch (err) {
    res.status(500).json({ reply: "My brain is a bit foggy (Server Error). Try again!" });
  }
});

module.exports = router;
