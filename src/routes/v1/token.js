const controller = require("../../controller/token");
const router = require("express").Router();
const authMiddleware = require("../../middleware/auth");
const authAdminMiddleware = require("../../middleware/authAdmin");

router.get("/", authMiddleware, controller.auth);

router.get("/admin", authAdminMiddleware, controller.auth);

module.exports = router;
