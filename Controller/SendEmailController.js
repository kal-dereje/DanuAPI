// Import the necessary module for sending emails
const sendEmail = require("../utils/sendEmail");

// Controller function for handling email
const SendEmailController = async (req, res) => {
  try {
    // Extract relevant data from the request body
    const { name, subject, email, message } = req.body;

    // Define email properties
    const send_to = [email]; // Recipient email address
    const sent_from = "mindrestet@gmail.com"; // Sender's email address
    const reply_to = email; // Reply-To email address

    // Create an HTML message with the client's contact form data
    const clientMessage = `<h1>Dear ${name},</h1>
                    
                     <p>${message}</p>
                     <br>
                     <br>
                     <h2>MindRest</h2>
    `;

    // Send the email with the client's contact form data
    await sendEmail(subject, clientMessage, send_to, sent_from, reply_to);

    // Respond with a success message
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json(error.message);
  }
};

// Export the SendEmailController to make it available for use in other parts of the application
module.exports = SendEmailController;
