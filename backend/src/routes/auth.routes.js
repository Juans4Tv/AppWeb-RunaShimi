const router = require("express").Router();
const { register, login, recoverPassword, createAdmin } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/recover-password", recoverPassword);
router.post("/create-admin", createAdmin);

module.exports = router;