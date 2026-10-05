const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, jobController.create);
router.get("/get-all", jobController.getAll);
router.get("/get-all/by-user-id/:user_id", auth, jobController.getAllByUserId);
router.get(
  "/get-all/by-worker-id/:worker_id",
  auth,
  jobController.getAllByWorkerId,
);
router.get("/get-by-id/:id", auth, jobController.getById);
router.put("/update-status/by-id", auth, jobController.updateStatusById);
router.put(
  "/update-status/with-worker-id/by-id",
  auth,
  jobController.updateStatusByIdWithWorkerId,
);
router.put("/update-rating/by-id", auth, jobController.updateRatingById);
router.put(
  "/update-review-status/by-id",
  auth,
  jobController.updateJobReviewStatusById,
);
router.put("/update/by-id", auth, jobController.updateJobById);

module.exports = router;
