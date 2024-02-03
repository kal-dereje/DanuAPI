const express = require("express");
const paymentRoute = express.Router();
var request = require("request");
// var options = {
//   method: "POST",
//   url: "https://api.chapa.co/v1/transaction/initialize",
//   headers: {
//     Authorization: "Bearer CHASECK_TEST-PI723u3HWSTwRMZMQBY6Dx3U5MgHD3eb",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     amount: "100",
//     currency: "ETB",
//     email: "abebech_bekele@gmail.com",
//     first_name: "Bilen",
//     last_name: "Gizachew",
//     phone_number: "0912345678",
//     tx_ref: "chewatatest-6669",
//     callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
//     return_url: "https://www.google.com/",
//     "customization[title]": "Payment for my favourite merchant",
//     "customization[description]": "I love online payments",
//   }),
// };

// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

// var options = {
//   method: "GET",
//   url: "https://api.chapa.co/v1/banks",
//   headers: {
//     Authorization: "Bearer CHASECK_TEST-PI723u3HWSTwRMZMQBY6Dx3U5MgHD3eb",
//   },
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
// var request = require("request");
// var options = {
//   method: "GET",
//   url: "https://api.chapa.co/v1/transaction/verify/chewatatest-6669",
//   headers: {
//     Authorization: "Bearer CHASECK_TEST-PI723u3HWSTwRMZMQBY6Dx3U5MgHD3eb",
//   },
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

paymentRoute.route("/chapa").get(request);

module.exports = paymentRoute;
