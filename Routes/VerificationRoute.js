// Import the necessary modules and packages
const express = require("express"); // Import Express.js
const { getVerificationCode } = require("../Controller/VerificationController");
// Create a router instance using Express
const router = express.Router();

// Define a route for handling POST requests at the root URL ("/")
// When a POST request is made to this URL, it will be handled by the sendEmailController
router.route("/:email").get(getVerificationCode);

// Export the router to make it available for use in other parts of the application
module.exports = router;
