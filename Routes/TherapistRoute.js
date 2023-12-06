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
therapistRouter.route("/getOneTherapist/:id").get(getOneTherapist);
therapistRouter.route("/updateTherapist/:id").patch(updateTherapist);
therapistRouter.route("/deleteTherapist/:id").delete(deleteTherapist);

module.exports = therapistRouter;
