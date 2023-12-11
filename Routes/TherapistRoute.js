const {
  createTherapist,
  getTherapist,
  getOneTherapist,
  deleteTherapist,
  updateTherapist,
} = require("../Controller/TherapistController");

const authentication = require("../MiddleWare/Authentication");
const express = require("express");
const therapistRouter = express.Router();

// clientRouter.use(authentication);
therapistRouter.route("/createTherapist").post(createTherapist);
therapistRouter.route("/getTherapists").get(getTherapist);
therapistRouter.route("/getOneTherapist/:therapistId").get(getOneTherapist);
therapistRouter.route("/updateTherapist/:therapistId").patch(updateTherapist);
therapistRouter.route("/deleteTherapist/:therapistId").delete(deleteTherapist);

module.exports = therapistRouter;
