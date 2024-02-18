// Import the 'nodemailer' package for sending emails
const nodemailer = require("nodemailer");

// Load environment variables from a .env file
require("dotenv").config();

/**
 * Send an email using Nodemailer.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The content of the email (HTML format).
 * @param {string} send_to - The email address to send the email to.
 * @param {string} sent_from - The sender's email address.
 * @param {string} reply_to - The email address to set as the "Reply-To" address.
 */
const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // Create a transporter using Nodemailer with SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.HOST, // SMTP server host
    port: process.env.PORT_NUMBER, // Port number for the SMTP server
    secure: false, // Set to true for TLS, false for other ports
    requireTLS: process.env.TLS, // Whether TLS is required
    auth: {
      user: process.env.USER, // SMTP server username
      pass: process.env.PASS, // SMTP server password
    },
  });

  // Define email options
  const options = {
    from: {
      name: sent_from, // Sender's name
      address: sent_from, // Sender's email address
    },
    to: send_to, // Recipient's email address
    reply_to: reply_to, // Reply-To email address
    subject: subject, // Email subject
    html: message, // HTML content of the email
  };

  try {
    // Send the email and wait for the result
    const info = await transporter.sendMail(options);
    console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Export the sendEmail function to make it available for use in other parts of the application
module.exports = sendEmail;
