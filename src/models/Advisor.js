const db = require("../../db/db-connection");
const Image = require("./Image");
// const cabecalho = require('./example'); //Importa o Model 'example'

const Advisor = db.sequelize.define(
  "advisor",
  {
    name: {
      type: db.Sequelize.STRING,
      validate: {
        len: [4, 50]
      }
    },
    description: {
      type: db.Sequelize.TEXT,
      validate: {
        len: [10, 600]
      }
    },
    email: {
      type: db.Sequelize.STRING,
      validate: {
        len: [4, 100],
        isEmail: true
      }
    },
    number: {
      type: db.Sequelize.STRING,
      validate: {
        len: [10, 13]
      }
    },
    role: {
      type: db.Sequelize.ENUM,
      values: ["User", "Advisor", "Manager", "Administrator", "Owner"],
      defaultValue: "Advisor"
    }
  },
  {
    freezeTableName: true
  }
);

Advisor.belongsTo(Image, {
  as: "avatar"
});

// db.sequelize.sync({ force: true }) // Truncate em todas as tabelas do banco
// db.sequelize.sync({ alter: true }); // Altera todas as tabelas que tem alterações

module.exports = Advisor;
