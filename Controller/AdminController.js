const UserModel = require("../Model/User");
const TherapistModel = require("../Model/Therapist");
const AproveRequestModel = require("../Model/AproveRequest");

const getApprovalRequest = async (req, res) => {
  try {
    const allAproveRequest = await AproveRequestModel.find().populate({
      path: "aproveRequest",
      populate: { path: "user" },
    });
    console.log(allAproveRequest);
    res.status(200).json(allAproveRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller function to handle deletion from aproveRequest array and update isActive to true
const approveTherapist = async (req, res) => {
  const { therapistId } = req.params;
  console.log(therapistId);
  try {
    // Find the therapist by ID and update isActive to true
    const updatedTherpaist = await UserModel.findByIdAndUpdate(
      therapistId,
      { isActive: true },
      { new: true } // To return the updated document
    );

    console.log(updatedTherpaist);

    const therapist = await TherapistModel.findOne({ user: therapistId });

    const request = await AproveRequestModel.findOneAndUpdate(
      {}, // Empty filter to match any document
      { $pull: { aproveRequest: therapist._id } }, // Pull the therapistId from the array
      { new: true } // Return the updated document
    );
    if (!request) {
      return res.status(404).json({ message: "AproveRequest not found" });
    }

    res
      .status(200)
      .json({ message: "Therapist approved and removed from AproveRequest" });
  } catch (error) {
    res.status(404).json({ message: "issue while aproving" });
  }
};

module.exports = {
  getApprovalRequest,
  approveTherapist,
};
