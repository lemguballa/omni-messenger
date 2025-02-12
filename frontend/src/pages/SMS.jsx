import { useState, useEffect } from "react";
import { Send } from "lucide-react";

const SMS = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ to: "", message: "" });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  const handleSend = async () => {
    console.log("newMessage:", newMessage);

    if (!newMessage.to.trim() || !newMessage.message.trim()) {
      console.error("Recipient phone number or message is missing");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: newMessage.to,
          message: newMessage.message,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        fetchMessages(); // Refresh messages after sending
        setNewMessage({ to: "", message: "" }); // Clear form
      } else {
        console.error("Failed to send message:", data);
      }
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
      {/* Messages List */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="mb-2 p-2 rounded-lg bg-gray-100 max-w-xs"
            >
              <strong>{msg.phone}</strong>
              <p>{msg.content}</p>
              <span className="text-xs text-gray-500">{msg.timestamp}</span>
            </div>
          ))
        )}
      </div>
      
      {/* New Message Modal */}
      <div className="p-4 border-t">
        <h2 className="text-lg font-semibold mb-2">New Message</h2>
        <input
          type="text"
          placeholder="Recipient Phone Number"
          value={newMessage.to}
          onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
          className="w-full border p-2 rounded-lg mb-2"
        />
        <textarea
          placeholder="Type your message"
          value={newMessage.message}
          onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
          className="w-full border p-2 rounded-lg mb-2"
        ></textarea>
        <button
          onClick={handleSend}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          <Send size={20} className="inline-block mr-2" /> Send Message
        </button>
      </div>
    </div>
  );
};

export default SMS;
