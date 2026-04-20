const router = require("express").Router();
const Dictionary = require("../models/Dictionary");

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { source: { $regex: search, $options: 'i' } },
          { target: { $regex: search, $options: 'i' } }
        ]
      };
    }
    const words = await Dictionary.find(query).limit(50);
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { source, target, language } = req.body;
    const word = await Dictionary.create({ source, target, language });
    res.json(word);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar palabra" });
  }
});

module.exports = router;