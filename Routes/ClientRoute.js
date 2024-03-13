const {
  createClient,
  getClients,
  getOneClient,
  deleteClient,
  updateClient,
  getOneClientUsingUserId,
} = require("../Controller/ClientController");

const authentication = require("../MiddleWare/Authentication");
const express = require("express");
const clientRouter = express.Router();

// clientRouter.use(authentication);
clientRouter.route("/createClient").post(createClient);
clientRouter.route("/getClients").get(getClients);
clientRouter
  .route("/getOneClientUserId/:clientUserId")
  .get(getOneClientUsingUserId);
clientRouter.route("/getOneClient/:clientId").get(getOneClient);
clientRouter.route("/updateClient/:clientId").patch(updateClient);
clientRouter.route("/deleteClient/:clientId").delete(deleteClient);

module.exports = clientRouter;
