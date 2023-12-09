const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the chat schema
const testimonySchema = new Schema(
  {
    testimony: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Testimony model
const Testimony = mongoose.model("Testimony", testimonySchema);

module.exports = Testimony;
