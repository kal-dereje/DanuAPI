const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the payment schema
const paymentSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    tx_ref: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Payment model
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
