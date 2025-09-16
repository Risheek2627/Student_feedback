const Course = require("../models/courseModel");
const User = require("../models/userModel");

const addCourse = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, author, description } = req.body;

    const course = new Course({
      title,
      author,
      description,
    });

    await course.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//update course

const updateCourse = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const { title, author, description } = req.body;

    course.title = title || course.title;
    course.author = author || course.author;
    course.description = description || course.description;

    // optional bcz sometimes author may give falsy values , it may not update in above so we can use this
    //   if (title !== undefined) course.title = title;
    // if (author !== undefined) course.author = author;
    // if (description !== undefined) course.description = description;

    await course.save();

    return res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
