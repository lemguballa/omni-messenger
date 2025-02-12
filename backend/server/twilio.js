import twilio from "twilio";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// SMS/MMS
export const sendSMS = async (to, message) => {
  try {
    const messageData = {
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to,
    };

    const response = await client.messages.create(messageData);
    console.log("SMS/MMS sent:", response.sid);
    return response;
  } catch (error) {
    console.error("Error sending SMS/MMS:", error);
    throw error;
  }
};


// export const connectUsers = async (caller, recipient) => {
//   try {
//     const response = await client.calls.create({
//       twiml: `<Response><Dial>${recipient}</Dial></Response>`, // Bridges the call
//       from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
//       to: caller // First, Twilio calls the caller
//     });

//     console.log("Call initiated:", response.sid);
//     return response;
//   } catch (error) {
//     console.error("Error making call:", error);
//     throw error;
//   }
// };


// Voice
export function generateAccessToken(req, res) {
  try {
    console.log("Generating token...");
    console.log("Incoming request:", req.query);

    const identity = req.query.identity || "UserA";
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_APP_SID,
      incomingAllow: true,
    });

    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
      process.env.TWILIO_API_SECRET,
      { identity }
    );

    token.addGrant(voiceGrant);
    res.json({ token: token.toJwt() });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Token generation failed" });
  }
}