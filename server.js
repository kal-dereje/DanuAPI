// Import required Node.js modules and third-party packages
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const Dbconnect = require("./config/DbConnection");
const userRoute = require("./Routes/UserRoute");
const clientRoute = require("./Routes/ClientRoute");
const bodyParser = require("body-parser");

// Connect to the database
Dbconnect();

// Middleware setup
app.use(express.json()); // Parse JSON requests
const corsConfig = {
  origin: "*", // Set the allowed origin for CORS (in this case, any origin is allowed)
  credentials: true,
};
app.use(bodyParser.json()); // Parse JSON requests using body-parser
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests using body-parser
app.use(cors(corsConfig)); // Enable CORS for all routes

// Define routes for the application
app.use("/api/user", userRoute); // User-related routes
app.use("/api/client", clientRoute); // Client-related routes

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
