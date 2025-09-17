const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, html) => {
  try {
    const info = await transpoter.sendMail({
      from: `${process.env.EMAIL_USER}`,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
