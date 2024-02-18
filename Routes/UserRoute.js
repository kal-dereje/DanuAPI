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

const { uploader } = require("../MiddleWare/uploders");

userRouter.route("/getUser").get(GetUser);
userRouter.route("/createUser").post(uploader, UserCreate);
userRouter.route("/loginUser").post(LoginUser);
// router.route("/:id").patch(profilePicUploder, UpdateUser);
userRouter.route("/delete/:userId").get(GetOneUser).delete(DeleteUser);
// .patch(UpdateUser);

module.exports = userRouter;
