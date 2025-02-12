import { useState } from 'react';
import { Send, Paperclip, File } from 'lucide-react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: 'John Doe',
      message: 'Hey, how are you?',
      timestamp: new Date(Date.now() - 3600000),
      attachments: []
    },
    {
      id: 2,
      sender: 'Me',
      message: 'I\'m good, thanks! Just working on some new features.',
      timestamp: new Date(Date.now() - 1800000),
      attachments: []
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setChatLog([...chatLog, {
      id: chatLog.length + 1,
      sender: 'Me',
      message: message,
      timestamp: new Date(),
      attachments: []
    }]);
    setMessage('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Handle file upload logic here
    console.log('File selected:', file.name);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>

      {/* Chat Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatLog.map((chat) => (
          <div
            key={chat.id}
            className={`flex flex-col ${
              chat.sender === 'Me' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-end gap-2">
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  chat.sender === 'Me'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{chat.message}</p>
                {chat.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {chat.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <File size={16} />
                        <span className="text-sm">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-xs mt-1 block opacity-75">
                  {formatTime(chat.timestamp)}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {chat.sender}
            </span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
            <Paperclip className="text-gray-500 hover:text-gray-700" />
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;