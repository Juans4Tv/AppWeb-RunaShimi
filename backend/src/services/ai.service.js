// src/services/ai.service.js
const axios = require("axios");

const IA_URL = "http://localhost:5001/translate";

exports.translate = async (text, toEspañol = false) => {
  try {
    const response = await axios.post(IA_URL, {
      text,
      to_español: toEspañol
    });

    return response.data;

  } catch (error) {
    console.error("Error llamando IA:", error.message);
    throw new Error("No se pudo conectar con la IA");
  }
};