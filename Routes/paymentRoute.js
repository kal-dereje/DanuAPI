const express = require("express");
const paymentRoute = express.Router();
const {
  createPayment,
  verifyPayment,
} = require("../Controller/PaymentController");
paymentRoute.route("/chapa").post(createPayment);
paymentRoute.route("/verifypayment").post(verifyPayment);

module.exports = paymentRoute;
