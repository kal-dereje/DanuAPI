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
  // try {
  //   const chat = await ChatModel.findById("656b636211efd7ae73426237").populate(
  //     "user"
  //   );
  //   if (therapist && therapist.user) {
  //     const user = therapist.user;
  //     // Access the user model
  //     console.log(user);
  //   } else {
  //     console.log("therapist or associated user not found");
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
};
const getOneChat = async (req, res) => {};
const updateChat = async (req, res) => {};
const deleteChat = async (req, res) => {};

module.exports = {
  createChat,
  getChat,
  getOneChat,
  updateChat,
  deleteChat,
};
