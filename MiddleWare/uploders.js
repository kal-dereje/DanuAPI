const multer = require("multer");
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("testImage");

const FileUploder = async (err, req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      throw new Error("can not upload");
    }
  });
};

module.exports = FileUploder;
