// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "SendGrid",
//   auth: {
//     user: "apikey",
//     pass: process.env.SENDGRID_API_KEY,
//   },
// });

// export const sendEmail = async (to, subject, text) => {
//   try {
//     await transporter.sendMail({
//       from: "your-email@example.com",
//       to,
//       subject,
//       text,
//     });
//     console.log("Email sent successfully!");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };


// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// import sgMail from '@sendgrid/mail';
// import dotenv from 'dotenv';

// // Load environment variables from .env
// dotenv.config();

// console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY); // Add this line to verify the API key

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: 'lem.guballa34@gmail.com', // Change to your recipient
//   from: 'lemuel.guballa34@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch((error) => {
//     console.error(error);
//   });


import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import fs from "fs"; // Required for reading files
import path from "path"; // For handling file paths

// Load environment variables from .env
dotenv.config();

// Verify API Key
if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ Missing SENDGRID_API_KEY in .env file");
  process.exit(1);
}

console.log("✅ SENDGRID_API_KEY loaded");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email using SendGrid with optional attachments.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text content.
 * @param {string} html - HTML content.
 * @param {Array<{ filename: string, path: string }>} attachments - Array of attachments.
 */
export const sendEmail = async (to, subject, text, html, attachments = []) => {
  try {
    // Prepare attachment data
    const formattedAttachments = attachments.map((file) => ({
      filename: file.filename,
      content: fs.readFileSync(file.path).toString("base64"), // Convert file to base64
      type: "application/octet-stream", // Generic MIME type
      disposition: "attachment",
    }));

    const msg = {
      to,
      from: process.env.SENDGRID_VERIFIED_SENDER, // Change this in .env
      subject,
      text,
      html,
      attachments: formattedAttachments,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.body || error.message);
    throw error;
  }
};