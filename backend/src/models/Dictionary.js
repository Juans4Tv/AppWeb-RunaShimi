// src/models/Dictionary.js
const mongoose = require("mongoose");

const dictionarySchema = new mongoose.Schema({
  source: String,
  target: String,
  language: String // "kic-es" o "es-kic"
});

module.exports = mongoose.model("Dictionary", dictionarySchema);