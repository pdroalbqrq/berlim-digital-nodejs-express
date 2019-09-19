const router = require("express").Router();
const controller = require("../../controller/user");

// Retorna todos os usuários
router.get("/", controller.allUsers);

// Retorna o usuário do qual o id foi passado por parâmetro
router.get("/:id", controller.user);

// Insere um novo usuário
router.post("/:imageId", controller.postUser);

// Edita as informações de um usuário existente
router.put("/:id/:imageId", controller.alterUser);

// Exclui um usuário
router.delete("/:id", controller.deleteUser);

module.exports = router;
