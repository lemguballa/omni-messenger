import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";

const socket = io("http://localhost:5000"); // Replace with your backend URL

function Chat({ conversationId, userId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (conversationId) {
      // Join chat room
      socket.emit("joinConversation", conversationId);

      // Listen for new messages
      socket.on("receiveMessage", (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [conversationId]);

  const sendMessage = () => {
    if (message.trim() && conversationId && userId) {
      socket.emit("sendMessage", { senderId: userId, conversationId, content: message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.sender?.username}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

// Define prop types
Chat.propTypes = {
  conversationId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Chat;
