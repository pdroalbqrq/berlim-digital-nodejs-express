const router = require("express").Router();
const controller = require("../../controller/training");

router.get("/", controller.trainings);

router.get("/:id", controller.training);

router.get("/item/:id", controller.item);

router.post("/:brandId/:bannerId/:advisorId", controller.createTraining);

router.put("/:id/:brandId?/:bannerId?/:advisorId?", controller.alterTraining);

router.post("/pagseguro", controller.pagseguro);

module.exports = router;
