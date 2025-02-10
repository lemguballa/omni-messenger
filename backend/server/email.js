import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "your-email@example.com",
      to,
      subject,
      text,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
