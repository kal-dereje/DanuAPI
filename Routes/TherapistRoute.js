const {
  createTherapist,
  getTherapist,
  getOneTherapist,
  deleteTherapist,
  updateTherapist,
  getTherapistsBySpeciality,
  getUserProfilePicture,
  getTherapistByUserId,
  getTherapistCv,
  getTherapistLicense,
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
therapistRouter.route("/getTherapistCv/:userId").get(getTherapistCv);
therapistRouter.route("/getTherapistLicense/:userId").get(getTherapistLicense);
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
