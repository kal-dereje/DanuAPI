// Import the necessary module for sending emails
const sendEmail = require("../utils/sendEmail");
const VerififcationCodeModel = require("../Model/VerificationCode");
// Controller function for handling contact form submissions
const SendEmailVerificationCodeController = async (req, res) => {
  try {
    // Extract relevant data from the request body
    const { email } = req.body;

    // Define email properties
    const send_to = [email]; // Recipient email address
    const sent_from = "mindrestet@gmail.com"; // Sender's email address
    const reply_to = email; // Reply-To email address
    const subject = "MindRest Email Verification Code"; // Email subject
    const randomFiveDigitNumber = generateRandomNumber(5);

    // Create an HTML message with the client's contact form data
    const clientMessage = `
                     <h2>Your Verification Code is: ${randomFiveDigitNumber}</h2>
    `;
    // Define the condition to find the document
    const condition = { email };
    // Set the option `upsert` to true
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    // Define the update or set of fields for the document
    const updateFields = { email, verificationCode: randomFiveDigitNumber };

    if (email) {
      const verificationCodeModel = VerififcationCodeModel.findOneAndUpdate(
        condition,
        updateFields,
        options
      )
        .then((updatedOrNewVerificationCode) => {
          console.log(
            "Verification code updated or created:",
            updatedOrNewVerificationCode
          );
        })
        .catch((error) => {
          console.error("Error updating or creating verification code:", error);
        });
    }

    // Send the email with the client's contact form data
    await sendEmail(subject, clientMessage, send_to, sent_from, reply_to);

    // Respond with a success message
    res
      .status(200)
      .json({ success: true, message: "Verfication code sent to your email" });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json(error.message);
  }
};

const generateRandomNumber = (length) => {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Export the SendEmailController to make it available for use in other parts of the application
module.exports = SendEmailVerificationCodeController;
