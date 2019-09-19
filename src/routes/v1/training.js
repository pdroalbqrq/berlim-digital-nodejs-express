const router = require("express").Router();
const controller = require("../../controller/training");

router.get("/", controller.trainings);

router.get("/:id", controller.training);

router.post("/:brandId/:bannerId/:advisorId", controller.createTraining);

router.put("/:id/:brandId/:bannerId/:advisorId", controller.alterTraining);

module.exports = router;
