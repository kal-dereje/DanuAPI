const express = require("express");
const paymentRoute = express.Router();
const {
  createPayment,
  verifyPayment,
  getTransactionHistory,
} = require("../Controller/PaymentController");

paymentRoute.route("/chapa").post(createPayment);
paymentRoute.route("/verifypayment").post(verifyPayment);
paymentRoute.route("/getTransactionHistory/:userId").get(getTransactionHistory);

module.exports = paymentRoute;
