const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const courseRoutes = require("./routes/courseRoutes.js");

const PORT = process.env.PORT;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/feedback", feedbackRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
