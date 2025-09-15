const Course = require("../models/courseModel");
const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");

const addFeedBack = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating, message } = req.body;

    const feedback = new Feedback({
      course: courseId,
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

const updateFeedBack = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const userId = req.user._id;
    const { rating, message } = req.body;

    const feedback = await Feedback.findOne({
      _id: feedbackId,
      student: userId,
    });

    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });

    feedback.rating = rating || feedback.rating;
    feedback.message = message || feedback.message;
    await feedback.save();

    return res
      .status(200)
      .json({ Feedback: feedback, message: "Feedback upadted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const myFeedbacks = async (req, res) => {
  try {
    const userId = req.user._id;

    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find({ student: userId })
      .select("-createdAt -updatedAt  -__v") // it excludes this properties from response
      .populate("course", "title")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // newest first

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }

    return res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//  Only admin can view all the feedbacks
const adminView = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin") {
      return res.json({ message: "You dont have access for this" });
    }
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    // feedback logic
    const { course, rating, student } = req.body;

    let filter = {};

    if (course) filter.course = course;
    if (rating) filter.rating = rating;
    if (student) filter.student = student;

    const feedbacks = await Feedback.find(filter)
      .select("-createdAt -updatedAt -__v")
      .populate("course", "title -_id")
      .populate("student", "name")
      .skip(skip)
      .limit(limit);

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }

    return res.status(200).json({ feedbacks: feedbacks });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addFeedBack,
  updateFeedBack,
  deleteFeedback,
  myFeedbacks,
  adminView,
};
