const express = require("express");

const auth = require("../middleware/authMiddleware");
const {
  totalFeedback,
  courseFeedback,
  registeredStudents,
  blockStudent,
  unblockStudent,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/totalFeedback", auth, totalFeedback);

router.post("/courseFeedback/:courseId", auth, courseFeedback);
router.get("/registeredStudents", auth, registeredStudents);
router.post("/block/:studentId", auth, blockStudent);
router.post("/unblock/:studentId", auth, unblockStudent);

module.exports = router;
