const {
  createChat,
  getChat,
  getOneChat,
  deleteChat,
  updateChat,
} = require("../Controller/ChatController");

const authentication = require("../MiddleWare/Authentication");
const express = require("express");
const chatRouter = express.Router();

// chatRouter.use(authentication);
chatRouter.route("/sendChat").post(createChat);
chatRouter.route("/getChats").get(getChat);
chatRouter.route("/getOneChat/:id").get(getOneChat);
chatRouter.route("/updateChat/:id").patch(updateChat);
chatRouter.route("/deleteChat/:id").delete(deleteChat);

module.exports = chatRouter;
