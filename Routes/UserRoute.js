const {
  UserCreate,
  GetUser,
  GetOneUser,
  DeleteUser,
  UpdateUser,
  LoginUser,
} = require("../Controller/UserController");
const express = require("express");
const userRouter = express.Router();

// const FileUploder = require("../MiddleWare/uploders");

// const multer = require("multer");

// const Storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: Storage,
// }).single("testImage");

userRouter.route("/GetUser").get(GetUser);
//router.route("/UserCreate").post(upload, UserCreate);
userRouter.route("/UserCreate").post(UserCreate);
userRouter.route("/LoginUser").post(LoginUser);
// router.route("/:id").patch(upload, UpdateUser);
userRouter.route("/:id").get(GetOneUser).delete(DeleteUser).patch(UpdateUser);

module.exports = userRouter;
