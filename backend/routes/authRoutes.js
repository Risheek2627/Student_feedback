const express = require("express");
const { body } = require("express-validator");
const { signUp, signIn } = require("../controllers/authController");

const router = express.Router();

// Signup route
router.post(
  "/signup",
  //   [
  //     body("name", "Name is required").notEmpty(),
  //     body("email", "Invalid email").isEmail(),
  //     body("password", "Password must be 8+ chars with 1 number & 1 special char")
  //       .isLength({ min: 8 })
  //       .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),
  //   ],
  signUp
);

// Login route
router.post("/login", signIn);

module.exports = router;
