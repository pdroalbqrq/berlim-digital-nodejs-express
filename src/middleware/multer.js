const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3-transform");
const sharp = require("sharp");
const aws = require("aws-sdk");

var s3 = new aws.S3();

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads")),
    filename: function(req, file, cb) {
      file.key = `${Date.now().toString()}-${file.originalname}`;
      cb(null, file.key);
    }
  }),
  s3: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    shouldTransform: function(req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [
      {
        id: "original",
        key: function(req, file, cb) {
          cb(null, `${Date.now().toString()}-${file.originalname}`);
        },
        transform: function(req, file, cb) {
          cb(null, sharp());
        }
      },
      {
        id: "low_quality",
        key: function(req, file, cb) {
          cb(null, `${Date.now().toString()}-low-quality-${file.originalname}`);
        },
        transform: function(req, file, cb) {
          cb(
            null,
            sharp()
              .jpeg({ quality: 1, progressive: true })
          );
        }
      }
    ]
  })
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[process.env.STORAGETYPE],
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "video/mp4",
      "video/x-m4v",
      "video/*"
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  }
};
