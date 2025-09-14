const mongoose = require("mongoose");
const Course = require("./models/courseModel");
require("dotenv").config(); // To read MONGO_URI from .env

const courses = [
  { title: "Web Development Basics", author: "John Doe" },
  { title: "Advanced Node.js", author: "Sarah Johnson" },
  { title: "Data Structures in JavaScript", author: "Michael Brown" },
  { title: "Database Management with MongoDB", author: "Emily Davis" },
  { title: "Frontend Development with React", author: "David Wilson" },
  { title: "Backend APIs with Express.js", author: "Sophia Martinez" },
  { title: "Full-Stack Application Deployment", author: "James Taylor" },
  { title: "Authentication & Security in Web Apps", author: "Olivia Anderson" },
  { title: "JavaScript ES6+ and Modern Features", author: "Ethan Thomas" },
  { title: "RESTful API Design Best Practices", author: "Isabella White" },
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Course.deleteMany(); // optional: clear old data
    await Course.insertMany(courses);
    console.log("✅ Courses seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding courses:", err);
    process.exit(1);
  }
};

seedCourses();
