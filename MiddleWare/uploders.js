const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profilePic");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const profilePicUploder = multer({
  storage: Storage,
}).single("profilePicture");

module.exports = { profilePicUploder };
