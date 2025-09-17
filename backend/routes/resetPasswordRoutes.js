const {
  requestPasswordReset,
  verifyOtp,
  resetPassword,
} = require("../controllers/resetPassword");
const express = require("express");

const router = express.Router();

router.post("/sendotp", requestPasswordReset);

router.post("/verifyotp", verifyOtp);

router.post("/password", resetPassword);

module.exports = router;
