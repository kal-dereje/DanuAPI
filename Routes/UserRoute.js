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

userRouter.route("/getUser").get(GetUser);
//router.route("/UserCreate").post(upload, UserCreate);
userRouter.route("/createUser").post(UserCreate);
userRouter.route("/loginUser").post(LoginUser);
// router.route("/:id").patch(upload, UpdateUser);
userRouter
  .route("/:userId")
  .get(GetOneUser)
  .delete(DeleteUser)
  .patch(UpdateUser);

module.exports = userRouter;
