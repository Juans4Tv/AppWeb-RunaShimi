const router = require("express").Router();
const auth = require("../middlewares/auth");
const Translation = require("../models/Translation");

router.get("/", auth, async (req, res) => {
  try {
    const translations = await Translation.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(translations);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener historial" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Translation.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

module.exports = router;