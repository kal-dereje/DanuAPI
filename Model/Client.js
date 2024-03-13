const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    sessionType: {
      type: String,
      required: true,
    },
    therapyHistory: {
      type: String,
    },
    therapistList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    questionnaire: [
      {
        type: String,
      },
    ],
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // other client fields...
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
