const {
  createClient,
  getClient,
  getOneClient,
  deleteClient,
  updateClient,
} = require("../Controller/ClientController");

const authentication = require("../MiddleWare/Authentication");
const express = require("express");
const clientRouter = express.Router();

// clientRouter.use(authentication);
clientRouter.route("/createClient").post(createClient);
clientRouter.route("/getClients").get(getClient);
clientRouter.route("/getOneClient/:id").get(getOneClient);
clientRouter.route("/updateClient/:id").patch(updateClient);
clientRouter.route("/deleteClient/:id").delete(deleteClient);

module.exports = clientRouter;
