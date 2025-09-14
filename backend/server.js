const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

const PORT = process.env.PORT;

connectDB();
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
