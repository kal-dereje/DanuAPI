const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const Dbconnect = require("./config/DbConnection");
const userRoute = require("./Routes/UserRoute");
const clientRoute = require("./Routes/ClientRoute");
const bodyParser = require("body-parser");

Dbconnect();

app.use(express.json());
const corsConfig = {
  origin: "*",
  credentials: true,
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use("/api/user", userRoute);
app.use("/api/client", clientRoute);
app.listen(port, () => {
  console.log(`port ${port}`);
});
