const User = require("../models/userModel");
const sendMail = require("../utils/email");
const crypto = require("crypto");

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "No user found" });

    const otp = crypto.randomInt(10000, 99999).toString(); // randomInt(min .max)

    user.resetOtp = otp;

    const otpExpiry = Date.now() + 10 * 60 * 1000; // valid for 10 min  --> 10 converts to sec as 60 sec per minutes and seconds to milliseconds   bcz Date.now() is calculated in ms so we are adiing 600000 ms means + 10min or 600 sec
    user.resetOtpExpriry = otpExpiry;

    await user.save();

    await sendMail(
      email,
      "Password Reset OTP",
      //   ` Your OTP ${otp} for resetting password . Valid for 10 minutes`
      `
  <div style="font-family: Arial, sans-serif; padding:15px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; max-width:380px;">
    <p style="margin:0 0 10px; color:#374151;">Your OTP for resetting your password is:</p>
    <div style="text-align:center; margin:15px 0;">
      <span style="display:inline-block; font-size:22px; font-weight:bold; color:#2563eb; letter-spacing:3px; background:#eff6ff; padding:8px 16px; border-radius:6px;">
        ${otp}
      </span>
    </div>
    <p style="margin:0; color:#6b7280;">This code is valid for <strong>10 minutes</strong>.</p>
  </div>
  `
    );

    return res.status(200).json({ messgae: "Otp sent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!otp) return res.status(401).json({ message: "Please enter otp" });

    if (user.resetOtpExpriry < Date.now()) {
      return res.status(400).json({ message: "Otp has been expried" });
    }

    if (!user.resetOtp || otp !== user.resetOtp) {
      return res.status(400).json({ message: "Invalid Otp" });
    }

    return res.json({ message: "Otp verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const bcrypt = require("bcryptjs");

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, renterPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (newPassword !== renterPassword) {
      return res.status(400).json({
        message: "Password is mismatching",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;
    user.resetOtp = undefined;
    user.resetOtpExpriry = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successfuly" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { requestPasswordReset, verifyOtp, resetPassword };
