const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    isBlocked: { type: Boolean, default: false },

    //   profile
    phone: {
      type: String,
    },
    dob: { type: Date },
    address: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
