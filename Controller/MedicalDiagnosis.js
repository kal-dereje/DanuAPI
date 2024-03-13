const DiagnosisModel = require("../Model/MedicalDiagnosis");
const UserModel = require("../Model/User");

const createDiagnosis = async (req, res) => {
  try {
    const { diagnosis, clientUserId, therapyistUserId } = req.body;
    const client = await UserModel.findById(clientUserId);
    const therapist = await UserModel.findById(therapyistUserId);

    if (client && therapist) {
      const diagnosisModel = new DiagnosisModel({
        diagnosis,
        client: client,
        therapist: therapist,
      });
      diagnosisModel.save();
      res.status(201).json({
        message: "medical diagnosis created successfully",
        diagnosisModel,
      });
    } else res.status(404).json("some thing wrong");
  } catch (error) {
    console.log(error);
  }
};

//GET ALL Diagnosis
const getDiagnosis = async (req, res) => {
  try {
    const diagnosis = await DiagnosisModel.find({}).populate([
      "client",
      "therapist",
    ]);
    if (diagnosis) {
      res.status(200).json(diagnosis);
    } else {
      res.status(200).json({ message: "There is no diagnosis found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getOneDiagnosis = async (req, res) => {
  try {
    const { diagnosisId } = req.params;

    const diagnosis = await DiagnosisModel.findById(diagnosisId).populate([
      "client",
      "therapist",
    ]);
    if (diagnosis) {
      res.status(200).json(diagnosis);
    } else {
      res.status(200).json({ message: "Diagnosis not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getDiagnosisUsingClientAndTherapistId = async (req, res) => {
  const { clientId, therapistId } = req.params;
  try {
    const diagnosis = await DiagnosisModel.find({
      client: clientId,
    })
      .populate("client") // Populate the 'client' field to get client details
      .populate("therapist");

    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateDiagnosis = async (req, res) => {
  try {
    const { diagnosisId } = req.params;
    const updatedData = req.body;
    const updatedDiagnosis = await DiagnosisModel.findByIdAndUpdate(
      diagnosisId,
      updatedData,
      {
        new: true,
      }
    );

    if (updatedDiagnosis) {
      res.status(200).json(updatedDiagnosis);
    } else {
      res.status(200).json({ message: "Diagnosis not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Delete Diagnosis
const deleteDiagnosis = async (req, res) => {
  try {
    const { diagnosisId } = req.params;

    const deleteDiagnosis = await DiagnosisModel.findByIdAndDelete(diagnosisId);

    if (deleteDiagnosis) {
      res.status(200).json({ messsage: "Diagnosis deleted successfully" });
    } else {
      res.status(200).json({ message: "diagnosis not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  createDiagnosis,
  getDiagnosis,
  getOneDiagnosis,
  updateDiagnosis,
  deleteDiagnosis,
  getDiagnosisUsingClientAndTherapistId,
};
