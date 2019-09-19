const router = require("express").Router();
const multer = require("multer");
const multerConfig = require("../../middleware/multer");

const controller = require("../../controller/image");

router.get("/", controller.images);

router.get("/profile", controller.profileImages);

router.get("/:id", controller.image);

router.post("/", multer(multerConfig).single("file"), controller.createImage);

router.delete("/:id", controller.deleteImage);

module.exports = router;
