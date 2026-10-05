const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobapplication.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, jobApplicationController.create);
router.put(
  "/update-status/by-id",
  auth,
  jobApplicationController.updateApplicationStatusById,
);
router.delete("/delete/by-id/:id", auth, jobApplicationController.deleteById);
router.get("/get-all", auth, jobApplicationController.getAll);
router.get(
  "/get-all/by-job-id/:job_id",
  auth,
  jobApplicationController.getAllByJobId,
);
router.get(
  "/get-all/by-worker-id/:worker_id",
  auth,
  jobApplicationController.getAllByWorkerId,
);
router.get("/get-by-id/:id", auth, jobApplicationController.getById);

module.exports = router;
