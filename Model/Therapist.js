const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema(
  {
    cv: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      required: true,
    },
    speciality: [{ type: String }],
    availabeDays: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      requried: true,
    },
    availabelTime: [
      {
        key: String,
        value: String,
      },
    ],
    pricePerHour: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    // other therapist fields...
  },
  { timestamps: true }
);

const Therapist = mongoose.model("Therapist", therapistSchema);

module.exports = Therapist;
