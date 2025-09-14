const Course = require("../models/courseModel");
const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");

const addFeedBack = async (req, res) => {
  try {
    const { course } = req.params;
    const { rating, message } = req.body;

    const feedback = await Feedback({
      course,
      rating,
      message,
      student: req.user._id,
    });
  } catch (error) {}
};
