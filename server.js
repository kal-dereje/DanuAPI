// Import required Node.js modules and third-party packages
const express = require("express");
const dotenv = require("dotenv").config();
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const Dbconnect = require("./config/DbConnection");
const userRoute = require("./Routes/UserRoute");
const clientRoute = require("./Routes/ClientRoute");
const therapistRoute = require("./Routes/TherapistRoute");
const chatRoute = require("./Routes/ChatRoute");
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
app.use("/api/therapist", therapistRoute); // Therapist-related routes
app.use("/api/chat", chatRoute); // chat-related routes

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = new socketIo.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected", userData.id);
  });
  socket.on("join room", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieve) => {
    var chat = newMessageRecieve.chatId;
    console.log(newMessageRecieve);
    socket.emit("test", "testing emit");
    if (!chat.users) console.log("chats.users is not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieve.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieve);
    });
  });
});
