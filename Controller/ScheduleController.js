const UserModel = require("../Model/User");
const TherapistModel = require("../Model/Therapist");
const ClientModel = require("../Model/Client");
const ScheduleModel = require("../Model/Schedule");

const createSchedule = async (req, res) => {
  try {
    const { date, clientUserId, therapistUserId } = req.body;

    const year = date.year;
    const month = date.month;
    const day = date.day;
    const startTime = date.startTime;
    const endTime = date.endTime;

    const newSchedule = new ScheduleModel({
      year,
      month,
      day,
      startTime,
      endTime,
      client: clientUserId,
      therapist: therapistUserId,
    });

    // Save the new schedule to the database
    const savedSchedule = await newSchedule.save();

    // const therapist = await TherapistModel.findOneAndUpdate(
    //   { user: therapistUserId }, // Find the therapist by user ObjectId
    //   { $push: { schedules: savedSchedule._id } }, // Add the schedule ObjectId to the schedules array
    //   { new: true } // To return the updated document
    // );

    // const client = await ClientModel.findOneAndUpdate(
    //   { user: clientUserId }, // Find the client by user ObjectId
    //   { $push: { schedules: savedSchedule._id } }, // Add the schedule ObjectId to the schedules array
    //   { new: true } // To return the updated document
    // );

    res.status(200).json({ message: "sucess", response: req.response });
  } catch (error) {
    res.status(404).json({ error: "Failed to create review" });
  }
};

// const getReview = async (req, res) => {
//   try {
//     const reviews = await ReviewModel.find({});
//     if (reviews) {
//       res.status(200).json(reviews);
//     } else {
//       res.status(200).json("There is no Review");
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
// const getOneReview = async (req, res) => {};
// const updateReview = async (req, res) => {};
// const deleteReview = async (req, res) => {};

module.exports = {
  createSchedule,
  //   getReview,
  //   getOneReview,
  //   updateReview,
  //   deleteReview,
};
