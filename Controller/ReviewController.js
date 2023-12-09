const UserModel = require("../Model/User");
const ReviewModel = require("../Model/Review");

const createReview = async (req, res) => {
  try {
    const { reviewContent, clientUserId, therapistUserId } = req.body;

    const client = await UserModel.findById(clientUserId);
    const therapist = await UserModel.findById(therapistUserId);
    console.log(client);
    console.log(therapist);
    if (client && therapist) {
      const reviewModel = new ReviewModel({
        reviewContent: reviewContent,
        client: client,
        therapist: therapist,
      });
      reviewModel.save();

      console.log(reviewModel);

      res.status(200).json(reviewModel);
    }
  } catch (error) {
    console.error("Error creating review", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

const getReview = async (req, res) => {
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
const getOneReview = async (req, res) => {};
const updateReview = async (req, res) => {};
const deleteReview = async (req, res) => {};

module.exports = {
  createReview,
  getReview,
  getOneReview,
  updateReview,
  deleteReview,
};
