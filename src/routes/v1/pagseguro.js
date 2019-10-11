const router = require("express").Router();
const controller = require("../../controller/pagseguro");

router.post("/session", controller.startSession);

module.exports = router;
