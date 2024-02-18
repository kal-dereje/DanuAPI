// Import the necessary modules and packages
const express = require("express"); // Import Express.js
const sendEmailController = require("../Controller/SendEmailController"); // Import the controller for handling contact form submissions
const sendEmailVerificationCode = require("../Controller/SendVerificationCode");
// Create a router instance using Express
const router = express.Router();

// Define a route for handling POST requests at the root URL ("/")
// When a POST request is made to this URL, it will be handled by the sendEmailController
router.route("/").post(sendEmailController);
router.route("/verification").post(sendEmailVerificationCode);

// Export the router to make it available for use in other parts of the application
module.exports = router;
