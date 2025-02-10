import { useState } from "react";
import axios from "../api";

function EmailForm() {
  const [email, setEmail] = useState({ to: "", subject: "", text: "" });

  const sendEmail = async () => {
    try {
      await axios.post("/api/send-email", email);
      alert("Email sent successfully!");
    } catch (error) {
      alert("Failed to send email.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Send Email</h2>
      <input
        className="border p-2 w-full my-2"
        type="email"
        placeholder="Recipient"
        onChange={(e) => setEmail({ ...email, to: e.target.value })}
      />
      <input
        className="border p-2 w-full my-2"
        type="text"
        placeholder="Subject"
        onChange={(e) => setEmail({ ...email, subject: e.target.value })}
      />
      <textarea
        className="border p-2 w-full my-2"
        placeholder="Message"
        onChange={(e) => setEmail({ ...email, text: e.target.value })}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={sendEmail}>
        Send Email
      </button>
    </div>
  );
}

export default EmailForm;
