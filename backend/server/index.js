import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";
import { setupWebSocket } from "./websocket.js";
import { sendEmail } from "./email.js";
import { sendSMS } from "./twilio.js";
import { generateAccessToken } from "./twilio.js";

// Load environment variables from .env
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const app = express();
const server = http.createServer(app);
const io = setupWebSocket(server);
const VoiceResponse = twilio.twiml.VoiceResponse;

// Enable CORS to allow requests from frontend
app.use(cors({ origin: "http://localhost:5173" }));;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/token", generateAccessToken);

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
  const { to, subject, text, html, attachments } = req.body;

  try {
    await sendEmail(to, subject, text, html, attachments);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Email failed to send.", error: error.message });
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
  app.post("/makeCall", async (req, res) => {
    const { to } = req.body;
  
    try {
        const call = await twilioClient.calls.create({
            url: "https://389d-2001-4451-1129-4e00-78b3-67b7-4ddb-5904.ngrok-free.app", // Replace with your actual server's TwiML URL
            to: to,
            from: twilioPhoneNumber,
        });

        res.json({ success: true, callSid: call.sid });
    } catch (error) {
        console.error("Error making call:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint to return TwiML for live voice
app.post("/twiml", (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.dial(req.body.To); // Bridges the call to the real recipient

    res.type("text/xml");
    res.send(twiml.toString());
});