const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    const decode = jwt.verify(token, process.env.jwt_secret);
    const userId = decode.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "No user found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message });
  }
};

module.exports = auth;
