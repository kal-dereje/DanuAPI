const ContactUs = require("../Model/ContactUs");

// Controller function to handle sending contact us information
const sendContactUs = async (req, res) => {
  try {
    const { name, email, message, senderUserId } = req.body;
    console.log(req.body);

    // Create a new ContactUs document
    const contactUs = new ContactUs({
      senderName: name,
      email,
      message,
      senderUserId,
    });

    // Save the contact us information to the database
    const savedContactUs = await contactUs.save();

    res.status(201).json(savedContactUs);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};

// Controller function to handle retrieving all contact us information
const getAllContactUs = async (req, res) => {
  try {
    // Retrieve all contact us information from the database
    const allContactUs = await ContactUs.find();

    res.status(200).json(allContactUs);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
};

module.exports = { sendContactUs, getAllContactUs };
