const db = require("../../db/db-connection");

const aws = require("aws-sdk");

const s3 = new aws.S3();

const Image = db.sequelize.define(
  "image",
  {
    name: {
      type: db.Sequelize.STRING
    },
    size: {
      type: db.Sequelize.STRING
    },
    type: {
      type: db.Sequelize.STRING
    },
    key: {
      type: db.Sequelize.STRING
    },
    url: {
      type: db.Sequelize.STRING
    },
    lowQualityUrl: {
      type: db.Sequelize.STRING
    }
  },
  {
    freezeTableName: true
  }
);

Image.addHook("beforeDestroy", (user, options) => {
  if (process.env.STORAGETYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET,
        Key: user.dataValues.key
      })
      .promise();
  }
});

Image.addHook("beforeCreate", (user, options) => {
  if (!user.dataValues.url) {
    user.dataValues.url = `${process.env.URL}/files/${user.dataValues.key}`;
  }
});


module.exports = Image;
