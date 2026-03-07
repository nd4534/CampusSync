const mongoose = require('mongoose');

const ChatbotSchema = new mongoose.Schema({
  keywords: [{ type: String, required: true }], // e.g., ["fee", "payment"]
  answer: { type: String, required: true },
  category: { type: String, default: "General" }
});

module.exports = mongoose.model('Chatbot', ChatbotSchema);