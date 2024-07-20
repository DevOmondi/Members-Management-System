const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
require("dotenv").config();

// TODO: Handle registration
const register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  userModel.createUser(username, hashedPassword, (err, user) => {
    if (err) return res.status(500).json({ message: "Error registering user" });
    res.status(201).json({
      message: `User ${user.username} registered successfully, proceed to login `,
    });
  });
};
// TODO: Handle login
const login = (req, res) => {
  const { username, password } = req.body;

  userModel.getUserByUsername(username, (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token: token });
  });
};

module.exports = {
  register,
  login,
};
