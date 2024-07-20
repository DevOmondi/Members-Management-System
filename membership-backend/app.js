const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
require("dotenv").config();
require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);

module.exports = app;
