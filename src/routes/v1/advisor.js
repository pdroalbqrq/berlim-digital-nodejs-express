const router = require("express").Router();
const controller = require("../../controller/advisor");

// Retorna todos os usuários
router.get("/", controller.allAdvisors);

// Retorna o usuário do qual o id foi passado por parâmetro
router.get("/:id", controller.advisor);

// Insere um novo usuário
router.post("/:imageId", controller.postAdvisor);

// Edita as informações de um usuário existente
router.put("/:id/:imageId", controller.alterAdvisor);

// Exclui um usuário
router.delete("/:id", controller.deleteAdvisor);

module.exports = router;
