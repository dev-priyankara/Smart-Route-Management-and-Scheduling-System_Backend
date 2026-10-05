const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const auth = require("../middlewares/auth");

router.post("/create", auth, notificationController.create);
router.get(
  "/get-all/by-user-id/:user_id",
  auth,
  notificationController.getByUserId,
);
router.get(
  "/get-all/unread/by-user-id/:user_id",
  auth,
  notificationController.getUnread,
);
router.patch("/read/:id", auth, notificationController.markAsRead);
router.patch("/read-all", auth, notificationController.markAllAsRead);
router.delete("/delete/by-id/:id", auth, notificationController.deleteById);

module.exports = router;
