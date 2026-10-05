const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
const auth = require("../middlewares/auth");

router.get("/activity", auth,reportController.getBActivity);

module.exports = router;