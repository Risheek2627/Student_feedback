const {
  editProfile,
  addProfile,
  viewProfile,
} = require("../controllers/profileController");

const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

router.post("/add", auth, upload.single("profilePic"), addProfile);
router.put("/edit", auth, upload.single("profilePic"), editProfile);
router.get("/view", auth, viewProfile);

module.exports = router;
