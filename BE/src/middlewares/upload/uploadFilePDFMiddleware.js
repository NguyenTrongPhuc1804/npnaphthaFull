const multer = require("multer");
// const cloudinary = require("cloudinary");
// const streamifier = require("streamifier");
const { mkdirp } = require("mkdirp");
const uploadFilePdfMiddleware = (name, fileName) => {
  const made = mkdirp.sync(`./public/pdf/${fileName}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/pdf/${fileName}`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const extentionImageList = [".pdf"];
      const extention = file.originalname.slice(-4);
      const check = extentionImageList.includes(extention);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("type not .jpg or .png"));
      }
    },
  });
  return upload.single(name);
};

module.exports = { uploadFilePdfMiddleware };
