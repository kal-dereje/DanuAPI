const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploader = multer({
  storage: Storage,
}).fields([
  { name: "profilePic", maxCount: 1 },
  { name: "cv", maxCount: 1 },
  { name: "license", maxCount: 1 },
]);

module.exports = { uploader };
