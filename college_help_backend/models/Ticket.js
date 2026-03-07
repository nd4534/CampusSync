// models/Ticket.js

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userRoll: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "resolved", "spam"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", ticketSchema);