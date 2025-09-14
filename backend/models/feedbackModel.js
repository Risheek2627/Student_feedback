const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    ratings: { type: Number, min: 1, max: 5 },
    message: {
      type: String,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
