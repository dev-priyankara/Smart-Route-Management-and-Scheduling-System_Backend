const reviewService = require("../services/review.service");

const formatReview = (review) => ({
  id: review.id,
  job_id: review.job_id,

  reviewer_id: review.reviewer_id,
  reviewer_user_id: review.reviewer_user_id,
  reviewer_name: review.reviewer_name,
  reviewer_profile_image: review.reviewer_profile_imagee
    ? Buffer.from(review.reviewer_profile_image).toString("base64")
    : null,

  reviewee_id: review.reviewee_id,
  reviewee_user_id: review.reviewee_user_id,
  reviewee_name: review.reviewee_name,
  reviewee_profile_image: review.reviewee_profile_image
    ? Buffer.from(review.reviewee_profile_image).toString("base64")
    : null,

  rating: review.rating,
  comment: review.comment,

  job_title: review.job_title,
  job_position: review.job_position,

  created_at: review.created_at,
  updated_at: review.updated_at,
});

const create = async (req, res, next) => {
  try {
    const { job_id, reviewer_id, reviewee_id, rating, comment } = req.body;
    const result = await reviewService.create(
      job_id,
      reviewer_id,
      reviewee_id,
      rating,
      comment,
    );
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getAllByRevieweeId = async (req, res, next) => {
  try {
    const { reviewee_id } = req.params;

    const result = await reviewService.getAllByRevieweeId(reviewee_id);

    const reviews = result.map(formatReview);

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAllByRevieweeId,
};
