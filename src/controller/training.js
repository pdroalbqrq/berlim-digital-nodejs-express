const Training = require("../models/Training");
const Image = require("../models/Image");
const Advisor = require("../models/Advisor");
const axios = require("axios");
const xml2js = require("xml2js");

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
      "price",
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
exports.item = (req, res) => {
  Training.findByPk(req.params.id, {
    include: [
      {
        model: Image,
        as: "brand",
        attributes: ["url", "lowQualityUrl", "type"]
      }
    ],
    attributes: ["id", "title", "price", "status"]
  }).then(data => {
    if (data) {
      return res.send({ product: data, quantity: 1 });
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
    price,
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
      price,
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

exports.pagseguro = (req, res) => {
  const { email, token } = req.body;

  //email = pdroalbqrq@gmail.com
  //token = 72543F4EAB734B59B09E5862573B755A

  axios
    .post(
      `https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=${email}&token=${token}`
    )
    .then(data => {
      var parser = new xml2js.Parser();
      response = data.data;
      parser.parseString(response, function(err, result) {
        console.dir(result);
        res.status(200).send(result);
        console.log("Done");
      });
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("error");
    });
};
