const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, reviewController.create);
router.get(
  "/get-all/by-reviewee-id/:reviewee_id",
  auth,
  reviewController.getAllByRevieweeId,
);

module.exports = router;
