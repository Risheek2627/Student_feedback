const express = require("express");

const auth = require("../middleware/authMiddleware");
const {
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const router = express.Router();

router.post("/add", auth, addCourse);
router.post("/update/courseId", auth, updateCourse);
router.post("/delete/courseId", auth, deleteCourse);
