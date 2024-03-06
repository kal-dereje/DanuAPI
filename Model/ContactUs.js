const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the contact us schema
const contactUsSchema = new Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    senderUserId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model defined
    },
  },
  { timestamps: true }
);

// Create the ContactUs model
const ContactUs = mongoose.model("ContactUs", contactUsSchema);

module.exports = ContactUs;
