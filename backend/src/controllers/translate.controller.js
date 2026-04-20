const Translation = require("../models/Translation");
const aiService = require("../services/ai.service");

exports.translate = async (req, res) => {
  try {
    const { text, direction } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Texto vacío" });
    }

    let formattedText = text;
    let toEspañol = false;
    
    if (direction === 'runaToEspanol') {
      toEspañol = true;
    }

    const result = await aiService.translate(formattedText, toEspañol);

    const translated = result.translated_text || result;

    if (req.user?.id) {
      await Translation.create({
        userId: req.user.id,
        input: text,
        output: translated
      });
    }

    res.json({
      success: true,
      data: { translated_text: translated }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error en traducción"
    });
  }
};