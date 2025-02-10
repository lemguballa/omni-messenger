import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { setupWebSocket } from "./websocket.js";
import { sendEmail } from "./email.js";
import { sendSMS, makeCall } from "./twilio.js";

// Load environment variables from .env
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = setupWebSocket(server);

// Enable CORS to allow requests from frontend
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Omni-Channel Communication API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Send email route
app.post("/api/send-email", async (req, res) => {
    const { to, subject, text } = req.body;
    try {
      await sendEmail(to, subject, text);
      res.json({ message: "Email sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Email failed to send." });
    }
  });

  // Send SMS route
  app.post("/api/send-sms", async (req, res) => {
    const { to, message } = req.body;
    try {
      await sendSMS(to, message);
      res.json({ message: "SMS sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: "SMS failed to send." });
    }
  });
  
  // Make call route
  app.post("/api/make-call", async (req, res) => {
    const { to } = req.body;
    try {
      await makeCall(to);
      res.json({ message: "Call initiated successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Call failed to initiate." });
    }
  });
