const Advisor = require("../models/Advisor");
const Image = require("../models/Image");

// Retornar todos os usuários
exports.allAdvisors = (req, res) => { 
  Advisor.findAll({
    include: [
      {
        model: Image,
        as: "avatar",
        attributes: ["url", "lowQualityUrl"]
      }
    ],
    attributes: ["id", "name"]
  }).then(data => {
    res.json(data);
  });
};

// Retornar o usuário do qual o id foi passado por parâmetro
exports.advisor = (req, res) => {
  Advisor.findByPk(req.params.id).then(data => {
    res.send(data);
  });
};

// Inserir um novo usuário
exports.postAdvisor = (req, res) => {
  console.log(req.body);
  console.log(req.params.imageId);
  const { name, email, number, description } = req.body;
  const avatarId = req.params.imageId;

  Advisor.create({
    name,
    description,
    email,
    number,
    avatarId
  })
    .then(() => Advisor.findOrCreate({ where: { email, number } }))
    .then(data => {
      res.send(data);
    })
    .catch(error => res.send(error));
};

// Editar as informações de um usuário existente
exports.alterAdvisor = (req, res) => {
  const { name, email, number, description } = req.body;
  const avatarId = req.params.imageId;

  Advisor.update(
    {
      name,
      description,
      email,
      number,
      avatarId
    },
    { where: { id: req.params.id } }
  ).then(result => {
    res.send(result);
  });
};

exports.deleteAdvisor = (req, res) => {
  Advisor.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.status(200).send({ data: "success" });
  });
};
