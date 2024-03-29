const {
  createDiagnosis,
  deleteDiagnosis,
  getDiagnosis,
  getOneDiagnosis,
  updateDiagnosis,
  getDiagnosisUsingClientAndTherapistId,
} = require("../Controller/MedicalDiagnosis");

const express = require("express");
const medicalDiagnosisRouter = express.Router();

// medicalDiagnosisRouter.use(authentication);
medicalDiagnosisRouter.route("/createMedicalDiagnosis").post(createDiagnosis);
medicalDiagnosisRouter.route("/getMedicalDiagnosis").get(getDiagnosis);
medicalDiagnosisRouter
  .route("/getOneMedicalDiagnosis/:diagnosisId")
  .get(getOneDiagnosis);
medicalDiagnosisRouter
  .route("/getDiagnosisUsingClientAndTherapistId/:clientId/:therapistId")
  .get(getDiagnosisUsingClientAndTherapistId);
medicalDiagnosisRouter
  .route("/updateMedicalDiagnosis/:diagnosisId")
  .patch(updateDiagnosis);
medicalDiagnosisRouter
  .route("/deleteMedicalDiagnosis/:diagnosisId")
  .delete(deleteDiagnosis);

module.exports = medicalDiagnosisRouter;
