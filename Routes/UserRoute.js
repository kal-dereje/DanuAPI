const {
  UserCreate,
  GetUser,
  GetOneUser,
  DeleteUser,
  UpdateUser,
  LoginUser,
  toggleUserActiveStatus,
  addOrChangePicture,
} = require("../Controller/UserController");
const express = require("express");
const userRouter = express.Router();

const { uploader } = require("../MiddleWare/uploders");

userRouter.route("/getUser").get(GetUser);
userRouter.route("/createUser").post(uploader, UserCreate);
userRouter.route("/toggleUserActiveStatus/:userId").put(toggleUserActiveStatus);
userRouter.route("/addOrChangePicture").post(uploader, addOrChangePicture);
userRouter.route("/loginUser").post(LoginUser);
userRouter.route("/updateUser/:userId").put(UpdateUser);
userRouter.route("/delete/:userId").get(GetOneUser).delete(DeleteUser);
// .patch(UpdateUser);

module.exports = userRouter;
