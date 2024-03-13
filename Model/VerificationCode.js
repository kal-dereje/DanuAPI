const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the chat schema
const verificationCodeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Chat model
const VerificationCode = mongoose.model(
  "VerificationCode",
  verificationCodeSchema
);

module.exports = VerificationCode;
