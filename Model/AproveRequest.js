const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the request schema
const aproveRequestSchema = new Schema(
  {
    aproveRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Therapist",
      },
    ],
  },
  { timestamps: true }
);

// Create the requset model
const AproveRequest = mongoose.model("AproveRequest", aproveRequestSchema);

module.exports = AproveRequest;
