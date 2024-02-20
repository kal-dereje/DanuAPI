const mongoose = require("mongoose");

const Dbconnect = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://kalab:HcPS-WSU7-cj9WF@minderest.m0bghtp.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(
      "DataBase Connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = Dbconnect;
