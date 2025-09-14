const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Singup
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.jwt_secret,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .json({ message: "Login successfully", token: token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { signIn, signUp };
