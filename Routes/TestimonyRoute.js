const {
  createTestimony,
  getTestimony,
  getOneTestimony,
  deleteTestimony,
  updateTestimony,
} = require("../Controller/TestimonyController");

const authentication = require("../MiddleWare/Authentication");
const express = require("express");
const testimonyRouter = express.Router();

// testimony.use(authentication);
testimonyRouter.route("/createTestimony").post(createTestimony);
testimonyRouter.route("/getTestimonys").get(getTestimony);
testimonyRouter.route("/getOneTestimony/:id").get(getOneTestimony);
testimonyRouter.route("/updateTestimony/:id").patch(updateTestimony);
testimonyRouter.route("/deleteTestimony/:id").delete(deleteTestimony);

module.exports = testimonyRouter;
