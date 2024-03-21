const express = require("express");
const paymentRoute = express.Router();
const Authentication = require("../MiddleWare/Authentication");
const {
  createPayment,
  verifyPayment,
  getTransactionHistory,
} = require("../Controller/PaymentController");
// paymentRoute.use(Authentication);
paymentRoute.route("/chapa").post(createPayment);
paymentRoute.route("/verifypayment").post(verifyPayment);
paymentRoute
  .route("/getTransactionHistory/:userId")
  .get(Authentication, getTransactionHistory);

module.exports = paymentRoute;
