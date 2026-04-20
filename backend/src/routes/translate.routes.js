const router = require("express").Router();
const { translate } = require("../controllers/translate.controller");

router.post("/", translate);

module.exports = router;