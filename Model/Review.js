const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the chat schema
const reviewSchema = new Schema(
  {
    reviewContent: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    therapist: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Testimony model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
