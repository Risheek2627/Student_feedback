const User = require("../models/userModel");
const Feedback = require("../models/feedbackModel");
const cloudinary = require("../config/cloudinary");
//  Name
// ○ Email (read-only)
// ○ Phone Number
// ○ Date of Birth
// ○ Address
// ○ Profile Picture (optional upload to Cloudinary or similar

const addProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const email = user.email;
    const name = user.name;
    const { phone, dob, address } = req.body;

    user.dob = dob;
    user.phone = phone;
    user.address = address;

    // ✅ Handle profile picture upload
    if (req.file) {
      user.profilePic = {
        url: req.file.path, // Cloudinary URL
        public_id: req.file.filename, // Cloudinary public_id
      };
    }

    await user.save();

    return res.status(200).json({
      profile: {
        name,
        email,
        phone,
        address,
        dob,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const email = user.email;
    const { name, phone, dob, address } = req.body;

    user.name = name || user.name;
    user.dob = dob || user.dob;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    // ✅ Delete picture if requested
    if (removePic && user.profilePic?.public_id) {
      await cloudinary.uploader.destroy(user.profilePic.public_id);
      user.profilePic = null;
    }

    if (req.file) {
      if (user.profilePic?.public_id) {
        await cloudinary.uploader.destroy(user.profilePic.public_id);
      }
      user.profilePic = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }
    await user.save();

    return res.status(200).json({
      profile: {
        name,
        email,
        phone,
        address,
        dob,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const viewProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select(
      "-_id -password -isBlocked -__v -createdAt -updatedAt"
    );

    console.log(feedbacks.length);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { editProfile, addProfile, viewProfile };
