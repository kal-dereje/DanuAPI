const ChatModel = require("../Model/Chat");

const createChat = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    var formattedMessage = { sender: sender, content: message };
    // Check if the chat already exists based on the sender and receiver
    const existingChat = await ChatModel.findOneAndUpdate(
      {
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      },
      { $push: { messages: formattedMessage } },
      { new: true, upsert: true }
    );

    res.status(200).json(existingChat);
  } catch (error) {
    console.error("Error creating chat", error);
    res.status(500).json({ error: "Failed to create chat" });
  }
};

const getChat = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await ChatModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
  }
};
const getOneChat = async (req, res) => {
  // try {
  //   const {chatId} = req.params;
  // } catch (err) {
  //   console.error(err);
  // }
};
const updateChat = async (req, res) => {};
const deleteChat = async (req, res) => {};

module.exports = {
  createChat,
  getChat,
  getOneChat,
  updateChat,
  deleteChat,
};
