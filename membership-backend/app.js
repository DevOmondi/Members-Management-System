const express = require("express");
const path = require("path");
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

// Test server
app.get("/", (req, res) => {
  res.json({message: "welcome to MMS backend"})
})

// serve static files from frontend
// app.use(express.static(path.join(__dirname, "../membership-frontend/dist")));

// Enable frontend routing
// app.use( (req, res, next) => {
//   res.sendFile(path.join(__dirname, "../membership-frontend/dist/index.html "));
// });
module.exports = app;
