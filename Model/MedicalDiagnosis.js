const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicalDiagnosisSchema = new Schema(
  {
    diagnosis: {
      type: String,
      required: true,
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    therapist: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const MedicalDiagnosis = mongoose.model(
  "MedicalDiagnosis",
  medicalDiagnosisSchema
);
module.exports = MedicalDiagnosis;
