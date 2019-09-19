const router = require("express").Router();
const controller = require("../../controller/user");

// Autentica usuário
router.post("/user", controller.userAuth);

// Autentica Admin
router.post("/admin", controller.adminAuth);

module.exports = router;
