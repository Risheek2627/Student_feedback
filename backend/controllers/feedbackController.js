const Course = require("../models/courseModel");
const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");

const addFeedBack = async (req, res) => {
  try {
    const { course } = req.params;
    const { rating, message } = req.body;

    const feedback = new Feedback({
      course,
      rating,
      message,
      student: req.user._id,
    });

    await feedback.save();
    return res.status(201).json({
      message: "Feedback added successfully",
      feedback,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await Feedback.findOneAndDelete({
      _id: feedbackId,
      student: req.user._id,
    });
    if (!feedback) {
      return res.status(404).json({ message: "No feedback found" });
    }
    return res.json({ message: "Deleted  the feedback" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const allFeedback = async (req, res) => {
  try {
    const user = await Feedback.findById({ _id: req.user._id });

    const feedback = await Feedback.find();
  } catch (error) {}
};
