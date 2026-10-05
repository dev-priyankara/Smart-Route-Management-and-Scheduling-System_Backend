const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

const errorHandler = require("../src/middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
