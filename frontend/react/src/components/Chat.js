import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with backend URL

function Chat({ conversationId, userId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (conversationId) {
      socket.emit("joinConversation", conversationId);

      socket.on("receiveMessage", (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [conversationId]);

  const sendMessage = () => {
    if (message.trim() && userId) {
      socket.emit("sendMessage", { senderId: userId, conversationId, content: message });
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Chat</h2>
      <div className="h-64 overflow-y-auto border p-2">
        {messages.map((msg, idx) => (
          <p key={idx} className="bg-gray-100 p-2 rounded my-1">
            <strong>{msg.sender?.username}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        className="border p-2 w-full my-2"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default Chat;
