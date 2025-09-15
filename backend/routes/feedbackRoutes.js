const express = require("express");
const {
  addFeedBack,
  updateFeedBack,
  deleteFeedback,
  myFeedbacks,
} = require("../controllers/feedbackController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add/:courseId", auth, addFeedBack);
router.post("/delete/:feedbackId", auth, deleteFeedback);
router.post("/update/:feedbackId", auth, updateFeedBack);
router.get("/view", auth, myFeedbacks);

module.exports = router;
