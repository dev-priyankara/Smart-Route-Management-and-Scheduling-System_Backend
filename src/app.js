const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user.routes");
const jobRoutes = require("./routes/job.routes");
const jobApplicationRoutes = require("./routes/jobapplication.routes");
const reviewRoutes = require("./routes/review.routes");
const requestRoutes = require("./routes/request.routes")
const notificationRoutes = require("./routes/notification.routes")
const reportRoutes = require("./routes/report.routes")

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/job-application", jobApplicationRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/request",requestRoutes)
app.use("/api/notification",notificationRoutes)
app.use("/api/reports",reportRoutes)

const errorHandler = require("../src/middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
