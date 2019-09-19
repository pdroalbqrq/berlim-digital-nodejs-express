const db = require("../../db/db-connection");
const bcrypt = require("bcryptjs");
const Image = require("./Image");
// const cabecalho = require('./example'); //Importa o Model 'example'

const User = db.sequelize.define(
  "user",
  {
    name: {
      type: db.Sequelize.STRING,
      validate: {
        len: [4, 50]
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
    password: {
      type: db.Sequelize.STRING,
    },
    role: {
      type: db.Sequelize.ENUM,
      values: ["User", "Advisor", "Manager", "Administrator", "Owner"],
      defaultValue: "User"
    }
  },
  {
    freezeTableName: true
  }
);

User.beforeCreate("Criptografar", async user => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.belongsTo(Image, {
  name: "avatarId",
  // as: "avatar"
});

// db.sequelize.sync({ force: true }) // Truncate em todas as tabelas do banco
// db.sequelize.sync({ alter: true }); // Altera todas as tabelas que tem alterações

module.exports = User;
