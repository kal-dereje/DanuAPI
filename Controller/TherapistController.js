const TherapistModel = require("../Model/Therapist");
const UserModel = require("../Model/User");

const createTherapist = async (req, res) => {
  try {
    const { certification, isQualifed, description, userId } = req.body;

    const user = await UserModel.findById(userId);
    console.log(user);
    if (user) {
      const therapistModel = new TherapistModel({
        certification,
        isQualifed,
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

const getTherapist = async (req, res) => {
  try {
    const therapist = await TherapistModel.findById(
      "656b636211efd7ae73426237"
    ).populate("user");
    if (therapist && therapist.user) {
      const user = therapist.user;
      // Access the user model
      console.log(user);
    } else {
      console.log("therapist or associated user not found");
    }
  } catch (err) {
    console.error(err);
  }
};
const getOneTherapist = async (req, res) => {};
const updateTherapist = async (req, res) => {};
const deleteTherapist = async (req, res) => {};

module.exports = {
  createTherapist,
  getTherapist,
  getOneTherapist,
  updateTherapist,
  deleteTherapist,
};
