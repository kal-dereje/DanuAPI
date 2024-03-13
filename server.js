// Import required Node.js modules and third-party packages
const express = require("express");
const dotenv = require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");
const socketIo = require("socket.io");
const { v4: uuidV4 } = require("uuid");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8005;
const Dbconnect = require("./config/DbConnection");
const userRoute = require("./Routes/UserRoute");
const clientRoute = require("./Routes/ClientRoute");
const therapistRoute = require("./Routes/TherapistRoute");
const chatRoute = require("./Routes/ChatRoute");
const tetsimonyRoute = require("./Routes/TestimonyRoute");
const paymentRoute = require("./Routes/paymentRoute");
const reviewRoute = require("./Routes/ReviewRoute");
const medicalDiagnosisRoute = require("./Routes/DiagnosisRoute");
const bodyParser = require("body-parser");
const sendEmail = require("./Routes/SendEmailRoute");
const verificationCodeRoute = require("./Routes/VerificationRoute");
const questionnaireRoute = require("./Routes/QuestionnaireRoute");
const scheduleRoute = require("./Routes/ScheduleRoute");
const contactUsRoute = require("./Routes/ContactUsRoute");
const adminRoute = require("./Routes/AdminRoute");
// Connect to the database
Dbconnect();

// Set up SSL options (provide your SSL certificate and key file paths)

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
};

// const uri = "http://localhostS:5173";
// Middleware setup
app.use(express.json()); // Parse JSON requests
const corsConfig = {
  origin: "*" /*uri*/, // Set the allowed origin for CORS (in this case, any origin is allowed)
  credentials: true,
};
app.use(bodyParser.json()); // Parse JSON requests using body-parser
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests using body-parser
app.use(cors(corsConfig)); // Enable CORS for all routes

// Define routes for the application
app.use("/api/user", userRoute); // User-related routes
app.use("/api/client", clientRoute); // Client-related routes
app.use("/api/therapist", therapistRoute); // Therapist-related routes
app.use("/api/chat", chatRoute); // chat-related routes
app.use("/api/testimony", tetsimonyRoute); // testimony-related routes
app.use("/api/review", reviewRoute); // review-related routes
app.use("/api/payment", paymentRoute); // review-related routes
app.use("/api/medicalDiagnosis", medicalDiagnosisRoute);
// Define the route for handling contact form submissions
app.use("/api/sendEmail", sendEmail);
app.use("/api/verification", verificationCodeRoute);
app.use("/api/questionnaire", questionnaireRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/contactUs", contactUsRoute);
app.use("/api/admin", adminRoute);

// Create an HTTPS server
// const server = https.createServer(
//   {
//     ...sslOptions,
//     agent: agent,
//   },
//   app
// );

// // Start the server and listen on the specified port
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

///////
// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = new socketIo.Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Expecting a 'username' event from the client
//   socket.on("targetUserID", (targetUserID) => {
//     socket.join(targetUserID); // Join a room based on the provided username
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });

//   socket.on("chat message", ({ message, targetUserID }) => {
//     // Emit the message to the specific room (targetUsername)
//     io.to(targetUserID).emit("chat message", {
//       targetUserID: targetUserID,
//       message,
//     });
//   });
// });

io.on("connection", (socket) => {
  console.log("A user connected");

  // Expecting a 'userID' event from the client
  socket.on("userID", (userID) => {
    // Join a room based on the provided userID
    socket.join(userID);
    console.log(`User ${userID} joined the chat`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", ({ message, targetUserID, senderName }) => {
    console.log(senderName);
    // Emit the message to the specific room (targetUserID)
    io.to(targetUserID).emit("chat message", {
      senderUserID: socket.id, // You can identify the sender by socket id
      message,
      senderName,
    });
  });

  // Handle incoming call event
  socket.on("call", (data) => {
    const { userId, callData } = data;
    console.log(`Incoming call for user ${userId}`);
    io.to(userId).emit("incomingCall", callData);
  });

  // Handle answering the call event
  socket.on("answerCall", (data) => {
    const { userId, answerData } = data;
    console.log(`Answering call for user ${userId}`);
    io.to(userId).emit("callAnswered", answerData);
  });

  // Handle ending the call event
  socket.on("endCall", (userId) => {
    console.log(`Ending call for user ${userId}`);
    io.to(userId).emit("callEnded");
  });
});
