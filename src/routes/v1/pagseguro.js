const router = require("express").Router();
const controller = require("../../controller/pagseguro");

router.post("/session", controller.startSession);

router.get("/payment-methods/:amount/:sessionId", controller.paymentMethods);

router.get("/card-flag/:bin/:sessionId", controller.getCardFlag);

router.post("/card-token", controller.getCardToken);

module.exports = router;
