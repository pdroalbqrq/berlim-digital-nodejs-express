const Training = require("../models/Training");
const Image = require("../models/Image");
const Advisor = require("../models/Advisor");

exports.trainings = (req, res) => {
  Training.findAll({
    include: [
      {
        model: Image,
        as: "banner",
        attributes: ["url", "lowQualityUrl", "type"]
      },
      {
        model: Image,
        as: "brand",
        attributes: ["url", "lowQualityUrl", "type"]
      }
    ]
    // attributes: ["id", "title", "status", "url"]
  }).then(data => res.send(data));
};

exports.training = (req, res) => {
  Training.findByPk(req.params.id, {
    include: [
      {
        model: Image,
        as: "banner",
        attributes: ["url", "lowQualityUrl", "type"]
      },
      {
        model: Image,
        as: "brand",
        attributes: ["url", "lowQualityUrl", "type"]
      },
      {
        model: Advisor,
        as: "advisor",
        attributes: ["name", "description"],
        include: [
          {
            model: Image,
            as: "avatar",
            attributes: ["url", "lowQualityUrl"]
          }
        ]
      }
    ],
    attributes: [
      "id",
      "title",
      "description",
      "target",
      "level",
      "vacancies",
      "status"
    ]
  }).then(data => {
    if (data) {
      return res.send(data);
    } else {
      return res.status(404).send({ msg: "Página não existe" });
    }
  });
};

exports.createTraining = (req, res) => {
  console.log(req.body);
  const url = req.body.title.replace(/ /g, "-").toLowerCase();
  const {
    title,
    description,
    target,
    advisor,
    level,
    vacancies,
    status
  } = req.body;
  const { bannerId, brandId } = req.params;

  Training.create({
    title,
    description,
    target,
    advisor,
    level,
    vacancies,
    status,
    url,
    bannerId,
    brandId
  }).then(data => res.json(data));
};

exports.alterTraining = (req, res) => {
  const {
    title,
    description,
    target,
    advisor,
    level,
    vacancies,
    status,
    url
  } = req.body;

  const { bannerId, brandId, advisorId, id } = req.params;

  Training.update(
    {
      title,
      description,
      target,
      advisor,
      level,
      vacancies,
      status,
      url,
      bannerId,
      brandId,
      advisorId
    },
    { where: { id } }
  ).then(result => {
    res.send(result);
  });
};
