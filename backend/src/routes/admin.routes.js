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

    const keys = Object.keys(data[0]);
    console.log("Columnas detectadas:", keys);

    const findKey = (alternatives) => {
      for (const alt of alternatives) {
        const found = keys.find(k => k.toLowerCase().normalize("NFC").includes(alt.toLowerCase().normalize("NFC")));
        if (found) return found;
      }
      return null;
    };

    const sourceKey = findKey(["español", "espanol", "esp", "source", "espa"])
      || keys.find(k => /espa/.test(k.toLowerCase().normalize("NFC")))
      || keys[0];
    const targetKey = findKey(["runa shimi", "runa", "target", "shimi"])
      || keys[1];
    const typeKey = findKey(["tipo de palabra", "tipo", "type", "palabra"])
      || keys[2];

    console.log("Usando keys:", { sourceKey, targetKey, typeKey });

    const existing = await Dictionary.find().select("source target").lean();
    const existingSet = new Set(existing.map(e => `${e.source.toLowerCase()}|${e.target.toLowerCase()}`));

    const toInsert = [];
    let skipped = 0;
    for (const row of data) {
      const source = row[sourceKey];
      const target = row[targetKey];
      const type = row[typeKey] || "";

      if (!source || !target) continue;

      const sourceClean = String(source).trim();
      const targetClean = String(target).trim();
      const key = `${sourceClean.toLowerCase()}|${targetClean.toLowerCase()}`;

      if (existingSet.has(key)) {
        skipped++;
        continue;
      }

      existingSet.add(key);
      toInsert.push({
        source: sourceClean,
        target: targetClean,
        type: String(type).trim()
      });
    }

    if (toInsert.length > 0) {
      await Dictionary.insertMany(toInsert, { ordered: false });
    }

    fs.unlinkSync(filePath);
    const imported = toInsert.length;
    res.json({ success: true, imported, skipped, message: `${imported} importadas, ${skipped} duplicadas` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al importar Excel" });
  }
});

router.post("/dictionary", admin, async (req, res) => {
  try {
    const { source, target, type } = req.body;
    const word = await Dictionary.create({ source, target, type });
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