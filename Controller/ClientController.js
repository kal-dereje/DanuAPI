const ClientModel = require("../Model/Client");
const UserModel = require("../Model/User");

const createClient = async (req, res) => {
  try {
    const { sessionType, therapyHistory, genderPreference, age } = req.body;

    const user = await UserModel.findById("6568dc01342fb3ab9e959c91");
    console.log(user);
    if (user) {
      const clientModel = new ClientModel({
        sessionType,
        therapyHistory,
        genderPreference,
        age,
        user: user,
      });
      clientModel.save();
      res
        .status(201)
        .json({ message: "Data created successfully", clientModel });
    }
  } catch (error) {
    console.log(error);
  }
};

const getClient = async (req, res) => {
  try {
    const client = await ClientModel.findById(
      "656b636211efd7ae73426237"
    ).populate("user");
    if (client && client.user) {
      const user = client.user;
      // Access the user model
      console.log(user);
    } else {
      console.log("Client or associated user not found");
    }
  } catch (err) {
    console.error(err);
  }
};
const getOneClient = async (req, res) => {};
const updateClient = async (req, res) => {};
const deleteClient = async (req, res) => {};

module.exports = {
  createClient,
  getClient,
  getOneClient,
  updateClient,
  deleteClient,
};
