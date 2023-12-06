const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema(
  {
    certification: {
      type: String,
      required: true,
    },
    isQualifed: {
      type: Boolean,
      default: false,
    },
    Description: {
      type: String,
      requried: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // other therapist fields...
  },
  { timestamps: true }
);

const Therapist = mongoose.model("Therapist", therapistSchema);

module.exports = Therapist;
