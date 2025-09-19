const Feedback = require("../models/feedbackModel");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

const totalFeedback = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });
    const feedbacks = await Feedback.find();

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedbacks found" });
    }

    return res.status(200).json({ total_feedbacks: feedbacks.length });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const courseFeedback = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    const courseFeed = await Feedback.find({ course: courseId })
      .select("-_id -createdAt -updatedAt -__v")
      .populate("course", "title")
      .select("-_id")
      // .populate("student", "name")
      .select("-_id");
    console.log("Courses", courseFeed);
    const feedmap = courseFeed.map((feed) => ({
      course: feed.course.title,
      student: feed.student.name,
      rating: feed.rating,
      message: feed.message,
    }));

    if (!courseFeed)
      return res
        .status(404)
        .json({ message: "No feebacks found on this course" });

    return res.status(200).json({ feedbacks: feedmap });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const registeredStudents = async (req, res) => {
  try {
    const users = await User.find({ role: "student" });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const students = users.map((user) => ({
      name: user.name,
      email: user.email,
      id: user._id,
    }));
    return res.status(200).json({ totalStudents: students.length, students });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const blockStudent = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { studentId } = req.params;

    const student = await User.findById(studentId);

    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.isBlocked === true)
      return res.json({ message: "User is already blocked" });
    student.isBlocked = true;

    await student.save();

    res.status(200).json({ message: "Blocked successfuly" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const unblockStudent = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { studentId } = req.params;

    const student = await User.findById(studentId);

    if (!student) return res.status(404).json({ message: "Student not found" });

    student.isBlocked = false;

    await student.save();

    res.status(200).json({ message: "Unblocked successfuly" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { studentId } = req.params;

    const student = await User.findByIdAndDelete(studentId);

    if (!student) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfuly" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const averageRating = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    const courseFeed = await Feedback.find({ course: courseId });

    if (!courseFeed.length)
      //if(!coursefeed) won’t work if courseFeed is an empty array (because [] is truthy). Use:
      return res
        .status(404)
        .json({ message: "No feedbacks found for this course" });
    const average =
      courseFeed.reduce((acc, course) => {
        return acc + course.rating;
      }, 0) / courseFeed.length;

    console.log("Average : ", average);

    return res.status(200).json({
      course: course.title,
      avg: average,
      total_feedbacks: courseFeed.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  totalFeedback,
  courseFeedback,
  registeredStudents,
  blockStudent,
  unblockStudent,
  deleteStudent,
  averageRating,
};
