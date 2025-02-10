import axios from "../api";

function SMSCall() {
  const sendSMS = async () => {
    try {
      await axios.post("/api/send-sms", { to: "+1234567890", message: "Hello from Twilio!" });
      alert("SMS sent successfully!");
    } catch (error) {
      alert("Failed to send SMS.");
    }
  };

  const makeCall = async () => {
    try {
      await axios.post("/api/make-call", { to: "+1234567890" });
      alert("Call initiated!");
    } catch (error) {
      alert("Failed to make call.");
    }
  };

  return (
    <div className="p-4">
      <button className="bg-green-500 text-white p-2 rounded mx-2" onClick={sendSMS}>
        Send SMS
      </button>
      <button className="bg-red-500 text-white p-2 rounded mx-2" onClick={makeCall}>
        Make Call
      </button>
    </div>
  );
}

export default SMSCall;
