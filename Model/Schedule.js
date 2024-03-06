const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the chat schema
const scheduleSchema = new Schema(
  {
    year: {
      type: String,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Create the Testimony model
const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
