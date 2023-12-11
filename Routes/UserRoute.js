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

const { profilePicUploder } = require("../MiddleWare/uploders");

userRouter.route("/getUser").get(GetUser);
userRouter.route("/createUser").post(profilePicUploder, UserCreate);
userRouter.route("/loginUser").post(LoginUser);
// router.route("/:id").patch(profilePicUploder, UpdateUser);
userRouter.route("/:userId").get(GetOneUser).delete(DeleteUser);
// .patch(UpdateUser);

module.exports = userRouter;
