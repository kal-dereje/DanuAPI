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
      { $push: { messages: formattedMessage }, sender, receiver },
      { new: true, upsert: true }
    );

    res.status(200).json(existingChat);
  } catch (error) {
    console.error("Error creating chat", error);
    res.status(500).json({ error: "Failed to create chat" });
  }
};

const getChatByReciverID = async (req, res) => {
  const { senderId, receiverId } = req.params;
  console.log("kalab");
  console.log(senderId, receiverId);
  try {
    // Find the chat between the sender and receiver
    const chat = await ChatModel.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (!chat) {
      return res.status(200).json({ messages: [] });
    }
    console.log(chat);
    res.status(200).json(chat);
  } catch (err) {
    console.error("Error retrieving chat:", err);
    res.status(500).json({ message: "Server error" });
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

//Will add if there is a feature for chats to be updated and deleted
const getOneChat = async (req, res) => {};
const updateChat = async (req, res) => {};
const deleteChat = async (req, res) => {};

module.exports = {
  createChat,
  getChat,
  getOneChat,
  updateChat,
  deleteChat,
  getChatByReciverID,
};
