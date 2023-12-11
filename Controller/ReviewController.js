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
    res.status(404).json({ error: "Failed to create review" });
  }
};

const getReview = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({});
    if (reviews) {
      res.status(200).json(reviews);
    } else {
      res.status(200).json("There is no Review");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
