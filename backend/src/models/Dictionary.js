// src/models/Dictionary.js
const mongoose = require("mongoose");

const dictionarySchema = new mongoose.Schema({
  source: String,          // español
  target: String,          // runa shimi
  type: String             // tipo de palabra (sustantivo, verbo, etc.)
});

module.exports = mongoose.model("Dictionary", dictionarySchema);