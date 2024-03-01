// Import the necessary module for sending emails
const PaymentModel = require("../Model/Payment");
const ClientModel = require("../Model/Client");
const ScheduleModel = require("../Model/Schedule");
const TherapistModel = require("../Model/Therapist");
var request = require("request");
const { createSchedule } = require("./ScheduleController");

const createPayment = async (req, res) => {
  try {
    // Extract relevant data from the request body
    const { tnx, date, clientUserId, therapistUserId } = req.body;

    let options = {
      method: "POST",
      url: "https://api.chapa.co/v1/transaction/initialize",
      headers: {
        Authorization: "Bearer CHASECK_TEST-PI723u3HWSTwRMZMQBY6Dx3U5MgHD3eb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: tnx.amount,
        currency: "ETB",
        email: tnx.email,
        first_name: tnx.firstName,
        last_name: tnx.lastName,
        phone_number: tnx.phoneNumber,
        tx_ref: tnx.tx_ref,
        callback_url:
          "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        return_url: "https://localhost:5173/verifypayment",
        "customization[title]": "Payment for my favourite merchant",
        "customization[description]": "I love online payments",
      }),
    };
    request(options, async function (error, response) {
      if (error) res.status(500).json({ message: "write herer" });

      // Create a new payment instance
      const newPayment = new PaymentModel({
        sender: clientUserId,
        receiver: therapistUserId,
        amount: tnx.amount,
        tx_ref: tnx.tx_ref,
      });
      const addClient = await TherapistModel.updateOne(
        { user: therapistUserId },
        { $push: { clients: clientUserId } }
      );

      console.log(addClient);
      // Save the payment to the database
      const savedPayment = await newPayment.save();
      console.log(savedPayment);

      const updatedClient = await ClientModel.updateOne(
        { user: clientUserId },
        {
          $set: { therapist: therapistUserId },
          $push: { therapistList: therapistUserId },
        }
      );

      console.log(updatedClient);
      req.response = response.body;
      await createSchedule(req, res);
    });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json(error.message);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { clientId } = req.body;

    // Find the payment entry associated with the sender's ID
    const payment = await PaymentModel.findOne({ sender: clientId }).sort({
      createdAt: -1,
    });
    const tx_ref = payment.tx_ref;

    var options = {
      method: "GET",
      url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      headers: {
        Authorization: "Bearer CHASECK_TEST-PI723u3HWSTwRMZMQBY6Dx3U5MgHD3eb",
      },
    };
    request(options, async function (error, response) {
      if (error) {
        console.log("got any error here??");
        // Find the latest payment associated with the sender ID and delete it
        const latestPayment = await PaymentModel.findOneAndDelete({
          sender: clientId,
        }).sort({
          createdAt: -1,
        });

        if (latestPayment) {
          console.log("Latest payment deleted successfully:", latestPayment);
        }
        const schedule = await ClientModel.findOne({ user: clientId }).populate(
          "schedule"
        );
        console.log(schedule);

        const latestSchedule = await ScheduleModel.findOneAndDelete({
          _id: schedule._id,
        }).sort({
          createdAt: -1,
        });

        const deletedSchedule = ClientModel.updateOne(
          { user: clientId },
          { $unset: { schedule: 1 } }
        );
        res
          .status(400)
          .json({ message: "failed chapa transsaction", error: error });
      }

      res.status(200).json(response.body);
    });

    // if (payment) res.status(200).json({ message: payment });
    // else res.status(400).json({ message: payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createPayment, verifyPayment };
