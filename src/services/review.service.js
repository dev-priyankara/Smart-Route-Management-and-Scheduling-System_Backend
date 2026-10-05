const Review = require("../models/review.model");

const create = async (job_id, reviewer_id, reviewee_id, rating, comment) => {
  const newReview = await Review.create(
    job_id,
    reviewer_id,
    reviewee_id,
    rating,
    comment,
  );
  return newReview;
};

const getAllByRevieweeId = async (reviewee_id) => {
  const row = await Review.getAllByRevieweeId(reviewee_id);
  return row;
};

module.exports = {
  create,
  getAllByRevieweeId,
};
