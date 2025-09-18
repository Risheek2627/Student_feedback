const {
  editProfile,
  addProfile,
  viewProfile,
} = require("../controllers/profileController");

const auth = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

router.post("/add", auth, addProfile);
router.put("/edit", auth, editProfile);
router.get("/view", auth, viewProfile);

module.exports = router;
