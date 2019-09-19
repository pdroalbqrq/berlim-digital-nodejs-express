const Image = require("../models/Image");

exports.images = (req, res) => {
  Image.findAll().then(data => res.send(data));
};

exports.profileImages = (req, res) => {
  Image.findAll({
    order: [["id", "ASC"]],
    limit: [5]
  }).then(data => res.send(data));
};

exports.image = (req, res) => {
  Image.findByPk(req.params.id).then(data => res.send(data));
};

exports.createImage = (req, res) => {
  console.log(req.file);
  const size = req.file.transforms.find(file => file.id === "original").size;
  const key = req.file.transforms.find(file => file.id === "original").key;
  const url = req.file.transforms.find(file => file.id === "original").location;
  const lowQualityUrl = req.file.transforms.find(
    file => file.id === "low_quality"
  ).location;
  const { originalname: name, mimetype: type } = req.file;

  Image.create({
    name,
    size,
    type,
    key,
    url,
    lowQualityUrl
  }).then(data => res.json(data));
};

exports.deleteImage = (req, res) => {
  Image.destroy({
    where: { id: req.params.id },
    individualHooks: true,
    returning: true,
    plain: true
  }).then(() => {
    res.status(200).send({ data: "success" });
  });
};
