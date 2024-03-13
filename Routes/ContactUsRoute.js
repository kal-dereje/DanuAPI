const {
  getAllContactUs,
  sendContactUs,
} = require("../Controller/ContactUsController");

const authentication = require("../MiddleWare/Authentication");

const express = require("express");
const contactUsRoute = express.Router();

// contactUsRoute.use(authentication);
contactUsRoute.route("/sendContactUs").post(sendContactUs);
contactUsRoute.route("/getContactUs").get(getAllContactUs);

module.exports = contactUsRoute;
