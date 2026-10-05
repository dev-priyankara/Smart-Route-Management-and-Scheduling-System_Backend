const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, requestController.create);
router.get("/get-all", auth, requestController.getAll);
router.get(
  "/get-all/by-user-id/:user_id",
  auth,
  requestController.getAllByUserId,
);
router.get(
  "/get-all/by-worker-id/:worker_id",
  auth,
  requestController.getAllByWorkerId,
);
router.get("/get-by-id/:id", auth, requestController.getById);
router.put("/update-status/by-id", auth, requestController.updateStatusById);
router.put(
  "/update-start-job-status/by-id",
  auth,
  requestController.updateStartJobStatusById,
);

module.exports = router;
