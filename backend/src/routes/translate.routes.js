const router = require("express").Router();
const { translate } = require("../controllers/translate.controller");
const optionalAuth = require("../middlewares/optionalAuth");

router.post("/", optionalAuth, translate);

module.exports = router;