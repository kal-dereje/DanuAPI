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
    genderPreference: {
      type: String,
      requried: true,
    },

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
