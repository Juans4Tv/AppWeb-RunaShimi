// src/models/Translation.js
const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  input: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Translation", translationSchema);