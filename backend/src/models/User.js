// src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['cliente', 'admin'], default: 'cliente' }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);