const TherapistModel = require("../Model/Therapist");
const UserModel = require("../Model/User");
const path = require("path");
const fs = require("fs");
// CREATE NEW THERAPIST
const createTherapist = async (req, res) => {
  try {
    const { gender, age, description, pricePerHour, speciality, userId, days } =
      req.body;
    const { profilePic, cv } = req.files;

    const user = await UserModel.findById(userId);
    console.log(profilePic);
    if (user) {
      const therapistModel = new TherapistModel({
        cv: cv[0]["filename"],
        speciality,
        description,
        pricePerHour,
        availabeDays: days,
        user: user,
      });
      therapistModel.save();
      const test = await UserModel.findOneAndUpdate(
        { _id: userId }, // Your query to find the document
        {
          $set: {
            age: age,
            gender: gender,
            profilePic: profilePic[0]["filename"],
            attempt: true,
          },
        }, // Use $set to specify the field and its new value
        { upsert: true, new: true, setDefaultsOnInsert: true } // To return the updated document
      );

      console.log(test);

      res
        .status(201)
        .json({ message: "Data created successfully", therapistModel });
    }
  } catch (error) {
    console.log(error);
  }
};

const getTherapistByUserId = async (req, res) => {
  const { therapistId } = req.params;
  try {
    const therapist = await TherapistModel.findOne({
      user: therapistId,
    }).populate("user");
    res.status(200).json({ success: true, message: therapist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Define the controller function
const getUserProfilePicture = async (req, res) => {
  const { userId } = req.params; // Assuming you have a userId to identify the user

  try {
    // Find the user by userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Get the file path of the user's profile picture
    const filePath = path.join(__dirname, "../uploads", user.profilePic);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Send the file as a response
      console.log(filePath);
      res.sendFile(filePath);
    } else {
      // If the file does not exist, return a 404 error
      res
        .status(404)
        .json({ success: false, message: "Profile picture not found" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error retrieving user profile picture:", error);
    res.status(500).json({ success: false, message: "Server Error" });
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

// Define the controller function
const getTherapistsBySpeciality = async (req, res) => {
  const { speciality } = req.params;

  try {
    // Query the database for therapists with the specified speciality
    const therapists = await TherapistModel.find({
      speciality: { $in: [speciality] },
    })
      .populate({
        path: "user",
        select: "-password", // Exclude the password field
      })
      .populate("schedules");

    // Return the matching therapists
    res.status(200).json({
      success: true,
      therapists: therapists,
    });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving therapists by speciality:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
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
  getUserProfilePicture,
  getTherapist,
  getTherapistsBySpeciality,
  getOneTherapist,
  updateTherapist,
  deleteTherapist,
  getTherapistByUserId,
};
