const ClientModel = require("../Model/Client");
const UserModel = require("../Model/User");

const createClient = async (req, res) => {
  try {
    const { sessionType, therapyHistory, genderPreference, userId } = req.body;

    const user = await UserModel.findById(userId);
    console.log(user);
    if (user) {
      const clientModel = new ClientModel({
        sessionType,
        therapyHistory,
        genderPreference,
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

//GET ALL CLIENTS
const getClients = async (req, res) => {
  try {
    const client = await ClientModel.find({}).populate("user");
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(200).json({ message: "There is no client found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getOneClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const client = await ClientModel.findById(clientId).populate("user");
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(200).json({ message: "Client or associated user not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const updatedData = req.body;
    const updatedClient = await ClientModel.findByIdAndUpdate(
      clientId,
      updatedData,
      {
        new: true,
      }
    );

    if (updatedClient) {
      res.status(200).json(updatedClient);
    } else {
      res.status(200).json({ message: "Client or associated user not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//NOT FINISHED~~~~~~
const deleteClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const deleteClient = await ClientModel.findByIdAndDelete(clientId);

    if (deleteClient) {
      res.status(200).json({ messsage: "Client deleted successfully" });
    } else {
      res.status(200).json({ message: "Client or associated user not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  createClient,
  getClients,
  getOneClient,
  updateClient,
  deleteClient,
};
