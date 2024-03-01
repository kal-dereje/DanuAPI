const {
  createTherapist,
  getTherapist,
  getOneTherapist,
  deleteTherapist,
  updateTherapist,
  getTherapistsBySpeciality,
  getUserProfilePicture,
  getTherapistByUserId,
} = require("../Controller/TherapistController");

const authentication = require("../MiddleWare/Authentication");

const { uploader } = require("../MiddleWare/uploders");
const express = require("express");
const therapistRouter = express.Router();

// clientRouter.use(authentication);
therapistRouter.route("/createTherapist").post(uploader, createTherapist);
therapistRouter.route("/getTherapists").get(getTherapist);
therapistRouter
  .route("/getUserProfilePicture/:userId")
  .get(getUserProfilePicture);
therapistRouter
  .route("/getTherapistsBySpeciality/:speciality")
  .get(getTherapistsBySpeciality);

therapistRouter.route("/getOneTherapist/:therapistId").get(getOneTherapist);
therapistRouter
  .route("/getTherapistByUserId/:therapistId")
  .get(getTherapistByUserId);
therapistRouter.route("/updateTherapist/:therapistId").patch(updateTherapist);
therapistRouter.route("/deleteTherapist/:therapistId").delete(deleteTherapist);

module.exports = therapistRouter;
