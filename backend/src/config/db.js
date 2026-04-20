// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.log("MongoDB: configure MONGODB_URI in .env");
      return;
    }
    await mongoose.connect(mongoUri);
    console.log("MongoDB conectado ✅");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
  }
};

module.exports = connectDB;