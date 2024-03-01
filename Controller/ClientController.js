const ClientModel = require("../Model/Client");
const UserModel = require("../Model/User");
const randomForest = require("../utils/randomForest");
const createClient = async (req, res) => {
  try {
    const { questionAnswer, userID } = req.body;
    const user = await UserModel.findById(userID);
    var sessionType;
    await randomForest(questionAnswer)
      .then((prediction) => {
        sessionType = prediction;
      })
      .catch((error) => {
        res.status(404).json({ message: error });
      });

    if (user) {
      UserModel.findOneAndUpdate(
        { _id: userID }, // Your query to find the document
        { $set: { attempt: true } }, // Use $set to specify the field and its new value
        { upsert: true, new: true, setDefaultsOnInsert: true } // To return the updated document
      )
        .then((updatedOrNewAttempt) => {
          console.log("attempt code updated or created:", updatedOrNewAttempt);
        })
        .catch((error) => {
          console.error("Error updating client attempt:", error);
        });

      const clientModel = new ClientModel({
        sessionType: sessionType[0],
        questionnaire: questionAnswer,
        user: user,
      });
      clientModel.save();
      res.status(201).json({ message: "Data created successfully" });
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

const getOneClientUsingUserId = async (req, res) => {
  try {
    const { clientUserId } = req.params;
    const client = await ClientModel.findOne({ user: clientUserId });
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(200).json({ message: "Client or associated user not found" });
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
  getOneClientUsingUserId,
};
