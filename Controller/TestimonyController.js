const UserModel = require("../Model/User");
const TestimonyModel = require("../Model/Testimony");

const createTestimony = async (req, res) => {
  try {
    const { testimony, userId } = req.body;

    const user = await UserModel.findById(userId);
    console.log(user);
    if (user) {
      const testimonyModel = new TestimonyModel({
        testimony,
        client: user,
      });
      testimonyModel.save();

      console.log(testimonyModel);

      res.status(200).json(testimonyModel);
    }
  } catch (error) {
    console.error("Error creating testimony", error);
    res.status(500).json({ error: "Failed to create testimony" });
  }
};

const getTestimony = async (req, res) => {
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
const getOneTestimony = async (req, res) => {};
const updateTestimony = async (req, res) => {};
const deleteTestimony = async (req, res) => {};

module.exports = {
  createTestimony,
  getTestimony,
  getOneTestimony,
  updateTestimony,
  deleteTestimony,
};
