const TherapistModel = require("../Model/Therapist");
const UserModel = require("../Model/User");
const AproveRequestModel = require("../Model/AproveRequest");

const path = require("path");
const fs = require("fs");
const { Console } = require("console");
// CREATE NEW THERAPIST
const createTherapist = async (req, res) => {
  try {
    const { gender, age, description, pricePerHour, speciality, userId, days } =
      req.body;
    const { profilePic, cv, license } = req.files;

    const user = await UserModel.findById(userId);
    console.log(license);
    if (user) {
      // const therapistModel = new TherapistModel({
      //   cv: cv[0]["filename"],
      //   license: license[0]["filename"],
      //   speciality,
      //   description,
      //   pricePerHour,
      //   availabeDays: days,
      //   user: user,
      // });
      // therapistModel.save();
      const therapistModel = await TherapistModel.findOneAndUpdate(
        { user: user }, // condition to find the document
        {
          // values to update or create
          cv: cv[0]["filename"],
          license: license[0]["filename"],
          speciality,
          description,
          pricePerHour,
          availabeDays: days,
          user: user,
        },
        { upsert: true, new: true } // To return the updated document
      );

      console.log(therapistModel);
      const test = await UserModel.findOneAndUpdate(
        { _id: userId }, // Your query to find the document
        {
          $set: {
            age: age,
            gender: gender,
            profilePic: profilePic[0]["filename"],
            license: license[0]["filename"],
            attempt: true,
            isActive: false,
          },
        }, // Use $set to specify the field and its new value
        { upsert: true, new: true, setDefaultsOnInsert: true } // To return the updated document
      );

      const updatedAproveRequest = await AproveRequestModel.findOneAndUpdate(
        {}, // Empty condition to match any document
        { $addToSet: { aproveRequest: therapistModel._id } }, // Add therapistId to the array if it doesn't exist
        { new: true, upsert: true } // Return the updated document, and create a new document if it doesn't exist
      );

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

    console.log(therapist);
    res.status(200).json({ success: true, message: therapist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateNoteByUser = async (req, res) => {
  try {
    // Extract the content of the note from the request body
    const { content, therapistId, userId } = req.body;

    // Find the therapist by ID
    const therapist = await TherapistModel.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    // Find the index of the note that matches the user ID
    const noteIndex = therapist.notes.findIndex(
      (note) => note.user.toString() === userId
    );

    if (noteIndex === -1) {
      const newNote = {
        content: content,
        user: userId,
      };

      // Push the new note to the existing notes array
      therapist.notes.push(newNote);

      // Save the updated therapist object
      await therapist.save();
    } else {
      therapist.notes[noteIndex].content =
        therapist.notes[noteIndex].content + "\n\n" + content;

      // Save the updated therapist object
      await therapist.save();
    }
    return res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getNotes = async (req, res) => {
  try {
    // Extract the content of the note from the request body
    const { therapistId, userId } = req.body;

    // Find the therapist by ID
    const therapist = await TherapistModel.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    // Find the index of the note that matches the user ID
    const noteIndex = therapist.notes.findIndex(
      (note) => note.user.toString() === userId
    );

    if (noteIndex === -1) {
      return res.status(200).json({ note: "You don't have any note yet" });
    } else {
      return res.status(200).json({ note: therapist.notes[noteIndex].content });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Internal server error" });
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

    if (user.profilePic) {
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
    } else {
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

// Define the controller function
const getTherapistCv = async (req, res) => {
  const { userId } = req.params; // Assuming you have a userId to identify the user

  try {
    // Find the user by userId
    const therapist = await TherapistModel.findOne({ user: userId });

    if (!therapist) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (therapist.cv) {
      // Get the file path of the user's CV
      const filePath = path.join(__dirname, "../uploads", therapist.cv);

      // Read the file content
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error("Error reading CV file:", err);
          return res
            .status(500)
            .json({ success: false, message: "Server Error" });
        }

        // Set response headers
        res.setHeader("Content-Type", "application/pdf"); // Set the appropriate content type

        // Send the file content as a response
        res.send(data);
      });
    } else {
      res.status(404).json({ success: false, message: "CV not found" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error retrieving user CV:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getTherapistLicense = async (req, res) => {
  const { userId } = req.params; // Assuming you have a userId to identify the user

  try {
    // Find the user by userId
    const therapist = await TherapistModel.findOne({ user: userId });

    if (!therapist) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (therapist.license) {
      // Get the file path of the user's CV
      const filePath = path.join(__dirname, "../uploads", therapist.license);

      // Read the file content
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error("Error reading License file:", err);
          return res
            .status(500)
            .json({ success: false, message: "Server Error" });
        }

        // Set response headers
        res.setHeader("Content-Type", "application/pdf"); // Set the appropriate content type

        // Send the file content as a response
        res.send(data);
      });
    } else {
      res.status(404).json({ success: false, message: "License not found" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error retrieving user License:", error);
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
    console.log(therapistId);
    const therapist = await TherapistModel.findById(therapistId)
      .populate("user")
      .populate("schedules");
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
  getTherapistCv,
  getTherapistLicense,
  updateNoteByUser,
  getNotes,
};
