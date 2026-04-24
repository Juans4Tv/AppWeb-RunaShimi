// src/services/ai.service.js
const axios = require("axios");

const IA_URL = "http://localhost:5001/translate";

// Diccionario fallback (cuando IA no está disponible)
const diccionarioFallback = {
  // Español -> Runa Shimi
  "hola": "imanalla",
  "buenos días": "alli puncha",
  "buenas tardes": "taki puncha",
  "buenas noches": "chiri puncha",
  "gracias": "yupaychani",
  "muchas gracias": "yupaychani falicitata",
  "casa": "wasi",
  "agua": "yaku",
  "tierra": "allpa",
  "sol": "inti",
  "luna": "killa",
  "fuego": "nina",
  "aire": "wayra",
  "montaña": "urcu",
  "rio": "mayu",
  "árbol": "kachu",
  "flor": "pilla",
  "amigo": "masi",
  "hermano": "turia",
  "hermana": "pani",
  "padre": "tata",
  "madre": "mama",
  "hijo": "churi",
  "hija": "hila",
  "abuelo": "mishki",
  "abuela": "mama",
  "nombre": "suti",
  "me llamo": "suti yani",
  "como estas": "imayri",
  "bien": "allilla",
  "mal": "mana allilla",
  "si": "ari",
  "no": "mana",
  "adios": "kaykama",
  "hasta luego": "rilakama",
  "bueno": "allik",
  "grande": "hatun",
  "pequeño": "huchuy",
  "nuevo": "mushna",
  "viejo": "maki",
  "día": "puncha",
  "noche": "chiri",
  "año": "wata",
  "mes": "killa",
  "trabajo": "llankay",
  "escuela": "yachay wasi",
  "maestro": "yachachik",
  "alumno": "yachak",
  
  // Runa Shimi -> Español
  "imanalla": "hola",
  "alli puncha": "buenos días",
  "taki puncha": "buenas tardes",
  "chiri puncha": "buenas noches",
  "yupaychani": "gracias",
  "wasi": "casa",
  "yaku": "agua",
  "allpa": "tierra",
  "inti": "sol",
  "killa": "luna",
  "nina": "fuego",
  "wayra": "aire",
  "urcu": "montaña",
  "mayu": "río",
  "kachu": "árbol",
  "pilla": "flor",
  "masi": "amigo",
  "turia": "hermano",
  "pani": "hermana",
  "tata": "padre",
  "mama": "madre",
  "churi": "hijo",
  "hila": "hija",
  "mishki": "abuelo",
  "suti": "nombre",
  "imayri": "cómo estás",
  "allilla": "bien",
  "mana allilla": "mal",
  "ari": "si",
  "mana": "no",
  "kaykama": "adiós"
};

// Función de traducción fallback
const traducirFallback = (text, toEspañol) => {
  const textLower = text.toLowerCase().trim();
  
  // Si es traducción al español, buscar en diccionario inverso
  if (toEspañol) {
    // Buscar coincidencia exacta
    if (diccionarioFallback[textLower]) {
      return diccionarioFallback[textLower];
    }
    // Buscar palabras individuales
    const palabras = textLower.split(' ');
    const traducidas = [];
    for (const palabra of palabras) {
      if (diccionarioFallback[palabra]) {
        traducidas.push(diccionarioFallback[palabra]);
      } else {
        traducidas.push(palabra);
      }
    }
    return traducidas.join(' ');
  }
  
  // Español a Runa Shimi
  // Buscar frases completas primero
  for (const [esp, kic] of Object.entries(diccionarioFallback)) {
    if (textLower.includes(esp)) {
      // Si no es una palabra de diccionario inverso
      if (!Object.keys(diccionarioFallback).some(k => diccionarioFallback[kic] === kic)) {
        return kic;
      }
    }
  }
  
  // Buscar palabras individuales
  for (const [esp, kic] of Object.entries(diccionarioFallback)) {
    if (textLower.includes(esp)) {
      return kic;
    }
  }
  
  return "[traducción no disponible]";
};

exports.translate = async (text, toEspañol = false) => {
  try {
    const response = await axios.post(IA_URL, {
      text,
      to_español: toEspañol
    }, {
      timeout: 5000 // 5 segundos timeout
    });

    const result = response.data;
    
    // Si la IA devuelve "[sin traducción]", usar fallback
    if (result.translated_text === "[sin traducción]" || 
        result.translated_text === "[traducción no disponible]") {
      const fallbackResult = traducirFallback(text, toEspañol);
      return { ...result, translated_text: fallbackResult };
    }
    
    return result;

  } catch (error) {
    // Si hay error, usar diccionario fallback
    console.log("IA no disponible, usando diccionario local...");
    const fallbackResult = traducirFallback(text, toEspañol);
    return { translated_text: fallbackResult };
  }
};