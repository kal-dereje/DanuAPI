const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema(
  {
    certification: {
      type: String,
      required: true,
    },
    proffesion: {
      type: String,
      required: true,
    },
    availabeDate: [
      {
        type: Date,
        default: Date.now,
      },
    ],
    description: {
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
