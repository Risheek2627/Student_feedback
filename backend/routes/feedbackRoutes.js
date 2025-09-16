const express = require("express");
const {
  addFeedBack,
  updateFeedBack,
  deleteFeedback,
  myFeedbacks,
  adminView,
  exportFeedback,
} = require("../controllers/feedbackController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

//Student routes
router.post("/add/:courseId", auth, addFeedBack);
router.post("/delete/:feedbackId", auth, deleteFeedback);
router.post("/update/:feedbackId", auth, updateFeedBack);
router.get("/view", auth, myFeedbacks);

// Admin routes

router.get("/AdminView", auth, adminView);
router.get("/export", auth, exportFeedback);
module.exports = router;
