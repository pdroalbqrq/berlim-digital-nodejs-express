const jwt = require("jsonwebtoken");
const authConfig = require("../config/authAdmin");

module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  // if (!authHeaders)
  //   return res.status(401).send({ error: "Nenhum Token Informado" });

  const parts = authHeaders.split(" ");

  if (!parts.lenght === 2) return res.status(401).send({ error: "Token erro" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token malformado" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: err });

    req.userId = decoded.id;

    return next();
  });
};
