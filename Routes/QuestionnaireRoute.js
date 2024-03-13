const express = require("express");
const quesionnaireRouter = express.Router();
const {
  SubmitClientQuesionnaire,
  SubmitTherapistQuesionnaire,
} = require("../Controller/submitQuestionnaire");

const { uploader } = require("../MiddleWare/uploders");

quesionnaireRouter
  .route("/SubmitTherapistQuesionnaire")
  .post(uploader, SubmitTherapistQuesionnaire);
quesionnaireRouter
  .route("/SubmitClientQuesionnaire")
  .post(uploader, SubmitClientQuesionnaire);

module.exports = quesionnaireRouter;
