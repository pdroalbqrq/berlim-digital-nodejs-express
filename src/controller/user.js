const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");
const authAdminConfig = require("../config/authAdmin");
const jwt = require("jsonwebtoken");

// Gerar o Token para Autenticação USER
const generateToken = params => {
  return jwt.sign(params, authConfig.secret);
};

// Gerar o Token para Autenticação ADMIN
const generateAdminToken = params => {
  return jwt.sign(params, authAdminConfig.secret);
};

// Autenticar usuário
exports.userAuth = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const password = Buffer.from(req.body.password, "base64").toString("ascii");
  await User.findOne({ where: { email } })
    .then(async user => {
      if (!(await user))
        return res.status(400).send({ error: "E-mail não existe" });
      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({ error: "Senha inválida" });
      user.password = undefined;
      res
        .send({ user, token: generateToken({ id: user.id }) })
    })
};

exports.adminAuth = async (req, res) => {
  const { email } = req.body;
  const password = Buffer.from(req.body.password, "base64").toString("ascii");

  await User.findOne({ where: { email } }).then(async user => {
    console.log(user);
    if (!(await user))
      return res.status(400).send({ error: "E-mail não existe" });

    if (!((await user.role) === "Administrator"))
      return res.status(400).send({ error: "Você não é Admin" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: "Senha inválida" });

    user.password = undefined;

    res.send({ user, token: generateAdminToken({ id: user.id }) });
  });
};

// Retornar todos os usuários
exports.allUsers = (req, res) => {
  User.findAll().then(data => {
    res.json(data);
  });
};

// Retornar o usuário do qual o id foi passado por parâmetro
exports.user = (req, res) => {
  User.findByPk(req.params.id).then(data => {
    res.send(data);
  });
};

// Inserir um novo usuário
exports.postUser = (req, res) => {
  const { name, email, number } = req.body;
  const password = Buffer.from(req.body.password, "base64").toString("ascii");
  const avatarId = req.params.id;

  User.create({
    name,
    email,
    number,
    password,
    avatarId
  })
    .then(() => User.findOrCreate({ where: { email, number } }))
    .then(data => {
      res.send(data);
    })
    .catch(error => res.send(error));
};

// Editar as informações de um usuário existente
exports.alterUser = (req, res) => {
  const { name, email, number, role } = req.body;
  const avatarId = req.params.imageId;

  User.update(
    {
      name,
      email,
      number,
      role,
      avatarId
    },
    { where: { id: req.params.id } }
  ).then(result => {
    res.send(result);
  });
};

exports.deleteUser = (req, res) => {
  User.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.status(200).send({ data: "success" });
  });
};
