const TherapistModel = require("../Model/Therapist");
const UserModel = require("../Model/User");

// CREATE NEW THERAPIST
const createTherapist = async (req, res) => {
  try {
    const { certification, description, userId } = req.body;

    const user = await UserModel.findById(userId);
    console.log(user);
    if (user) {
      const therapistModel = new TherapistModel({
        certification,
        description,
        user: user,
      });
      therapistModel.save();
      res
        .status(201)
        .json({ message: "Data created successfully", therapistModel });
    }
  } catch (error) {
    console.log(error);
  }
};

//GET ALL THERAPIST
const getTherapist = async (req, res) => {
  try {
    const therapists = await TherapistModel.find({}).populate("user");

    if (therapists) {
      res.status(200).json({ therapists });
    } else {
      res
        .status(200)
        .json({ message: "therapist or associated user not found" });
    }
  } catch (err) {
    res.status(404).json({ messasge: err.message });
  }
};
const getOneTherapist = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const therapist = await TherapistModel.findById(therapistId).populate(
      "user"
    );
    if (therapist) {
      res.status(200).json({ therapist });
    } else {
      res.status(404).json({ messasge: "therapist not found" });
    }
  } catch (err) {
    res.status(422).json({ messasge: err.message });
  }
};
const updateTherapist = async (req, res) => {
  try {
    const updatedData = req.body;
    const { therapistId } = req.params;

    const updatedTherapist = await TherapistModel.findByIdAndUpdate(
      therapistId,
      updatedData,
      {
        new: true,
      }
    );
    if (updatedTherapist) {
      res.status(200).json(updatedTherapist);
    } else {
      res.status(404).json({ message: "Therapist not found" });
    }
  } catch (err) {
    res.status(422).json({ messasge: err.message });
  }
};

//NOT FINISHED~~~~
const deleteTherapist = async (req, res) => {
  try {
    const { therapistId } = req.params;

    const deletedTherapist = await TherapistModel.findByIdAndDelete(
      therapistId
    );
    if (deletedTherapist) {
      res.status(200).json({ message: "succesfully deleted", user });
    } else {
      res.status(404).json({ message: "Therapist not found" });
    }
  } catch (err) {
    res.status(422).json({ messasge: err.message });
  }
};

module.exports = {
  createTherapist,
  getTherapist,
  getOneTherapist,
  updateTherapist,
  deleteTherapist,
};
