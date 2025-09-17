const {
  requestPasswordReset,
  verifyOtp,
  resetPassword,
  changePassword,
} = require("../controllers/resetPassword");
const auth = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

router.post("/sendotp", requestPasswordReset);

router.post("/verifyotp", verifyOtp);

router.post("/password", resetPassword);

router.post("/changePassword", auth, changePassword);
module.exports = router;
