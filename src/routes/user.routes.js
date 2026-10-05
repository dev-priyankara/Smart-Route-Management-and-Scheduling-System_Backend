const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../../config/upload");
const auth = require("../middlewares/auth");

router.post("/create", userController.registerUser);
router.post("/login", userController.login);
router.post("/send-otp", userController.sendOtp);
router.post("/verify-email", userController.verifyEmail);
router.put("/change-password-by-email", userController.changePasswordByEmail);
router.put(
  "/update-account-status/by-id",
  auth,
  userController.updateAccountStatusById,
);
router.get("/get-by-id/:id", auth, userController.findById);
router.get("/get-all", userController.findAll);
router.put(
  "/update-by-id",
  upload.single("profile_image"),
  userController.updateUserById,
);
router.put(
  "/update-average-rating/by-id",
  auth,
  userController.updateUserAverageRating,
);

module.exports = router;
