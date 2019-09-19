const db = require("../../db/db-connection");
const Image = require("./Image");
const Advisor = require("./Advisor");
// const cabecalho = require('./example'); //Importa o Model 'example'

const Training = db.sequelize.define(
  "training",
  {
    title: {
      type: db.Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [4, 50],
        notNull: true
      }
    },
    url: {
      type: db.Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [4, 50],
        notNull: true
      }
    },
    description: {
      type: db.Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: [10, 500],
        notNull: true
      }
    },
    target: {
      type: db.Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: [10, 400],
        notNull: true
      }
    },

    level: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    vacancies: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    status: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  },
  {
    freezeTableName: true
  }
);

Training.belongsTo(Image, {
  as: "banner"
});
Training.belongsTo(Advisor, {
  as: "advisor"
});
Training.belongsTo(Image, {
  as: "brand"
});

module.exports = Training;
