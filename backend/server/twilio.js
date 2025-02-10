import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to, message) => {
  try {
    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("SMS sent:", msg.sid);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

export const makeCall = async (to) => {
  try {
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("Call initiated:", call.sid);
  } catch (error) {
    console.error("Error making call:", error);
  }
};
