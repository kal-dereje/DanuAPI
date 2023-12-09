const {
  createReview,
  getReview,
  getOneReview,
  deleteReview,
  updateReview,
} = require("../Controller/ReviewController");

const authentication = require("../MiddleWare/Authentication");
const express = require("express");
const reviewRouter = express.Router();

// review.use(authentication);
reviewRouter.route("/createReview").post(createReview);
reviewRouter.route("/getReviews").get(getReview);
reviewRouter.route("/getOneReview/:id").get(getOneReview);
reviewRouter.route("/updateReview/:id").patch(updateReview);
reviewRouter.route("/deleteReview/:id").delete(deleteReview);

module.exports = reviewRouter;
