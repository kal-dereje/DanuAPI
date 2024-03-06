const UserModel = require("../Model/User");
const ReviewModel = require("../Model/Review");

const createReview = async (req, res) => {
  try {
    const { reviewContent, rating, clientUserId, therapistUserId } = req.body;

    const reviewModel = new ReviewModel({
      reviewContent: reviewContent,
      client: clientUserId,
      therapist: therapistUserId,
      rating: rating,
    });
    reviewModel.save();
    const ratingTherapist = await UserModel.findById(therapistUserId);
    let rate = rating;
    if (ratingTherapist.rating == 0) {
      const updatedRating = await UserModel.findOneAndUpdate(
        { _id: therapistUserId }, // Your query to find the document
        {
          $set: {
            rating: rating,
          },
        }, // Use $set to specify the field and its new value
        { upsert: true, new: true, setDefaultsOnInsert: true } // To return the updated document
      );
      res.status(200).json(updatedRating);
    } else {
      rate = (ratingTherapist.rating + rating) / 2;
      const updatedRating = await UserModel.findOneAndUpdate(
        { _id: therapistUserId }, // Your query to find the document
        {
          $set: {
            rating: rate,
          },
        }, // Use $set to specify the field and its new value
        { upsert: true, new: true, setDefaultsOnInsert: true } // To return the updated document
      );
      res.status(200).json(updatedRating);
    }
  } catch (error) {
    res.status(404).json({ error: "Failed to create review" });
  }
};

const getReview = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const reviews = await ReviewModel.find({ therapist: therapistId }).populate(
      "client"
    );
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
