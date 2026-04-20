const router = require("express").Router();
const admin = require("../middlewares/admin");
const Dictionary = require("../models/Dictionary");
const Translation = require("../models/Translation");
const User = require("../models/User");
const multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "/tmp" });

router.get("/users", admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

router.post("/dictionary/upload", admin, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió archivo" });
    }

    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data || data.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: "Archivo vacío" });
    }

    let imported = 0;
    for (const row of data) {
      if (row.source && row.target) {
        await Dictionary.create({
          source: String(row.source).trim(),
          target: String(row.target).trim(),
          language: row.language || "es-kic"
        });
        imported++;
      }
    }

    fs.unlinkSync(filePath);
    res.json({ success: true, imported, message: `${imported} palabras importadas` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al importar Excel" });
  }
});

router.post("/dictionary", admin, async (req, res) => {
  try {
    const { source, target, language } = req.body;
    const word = await Dictionary.create({ source, target, language });
    res.json(word);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar palabra" });
  }
});

router.delete("/dictionary/:id", admin, async (req, res) => {
  try {
    await Dictionary.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

router.get("/translations", admin, async (req, res) => {
  try {
    const translations = await Translation.find().populate("userId", "username email").sort({ createdAt: -1 }).limit(100);
    res.json(translations);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener traducciones" });
  }
});

module.exports = router;