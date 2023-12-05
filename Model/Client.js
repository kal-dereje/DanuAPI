const mongoose = require("mongoose");
const User = require("./User"); // Import the User schema

const clientSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // other patient fields...
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
