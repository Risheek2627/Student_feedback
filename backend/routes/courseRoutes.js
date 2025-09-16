const express = require("express");

const auth = require("../middleware/authMiddleware");
const {
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const router = express.Router();

router.post("/add", addCourse);
router.post("/update/courseId", updateCourse);
router.post("/delete/courseId", deleteCourse);
