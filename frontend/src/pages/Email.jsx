import { useState } from 'react';
import { Mail, Send, Paperclip, Trash, Star, Clock } from 'lucide-react';

const Email = () => {
  const [emails] = useState([
    {
      id: 1,
      from: 'john.doe@example.com',
      subject: 'Project Update',
      preview: 'Here are the latest updates on the project...',
      date: new Date(Date.now() - 3600000),
      read: false,
      starred: false
    },
    {
      id: 2,
      from: 'jane.smith@example.com',
      subject: 'Meeting Tomorrow',
      preview: 'Just a reminder about our meeting tomorrow at...',
      date: new Date(Date.now() - 7200000),
      read: true,
      starred: true
    }
  ]);

  const [showCompose, setShowCompose] = useState(false);
  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const handleSend = () => {
    // Handle email sending logic here
    console.log('Sending email:', newEmail);
    setShowCompose(false);
    setNewEmail({ to: '', subject: '', message: '' });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Handle file upload logic here
    console.log('File selected:', file.name);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg">
      <div className="grid grid-cols-4 min-h-screen">
        {/* Sidebar */}
        <div className="col-span-1 border-r p-4">
          <button
            onClick={() => setShowCompose(true)}
            className="w-full mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <Mail size={20} />
            Compose
          </button>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <Mail size={20} />
              Inbox
            </a>
            <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <Star size={20} />
              Starred
            </a>
            <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <Clock size={20} />
              Sent
            </a>
            <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <Trash size={20} />
              Trash
            </a>
          </nav>
        </div>

        {/* Email List */}
        <div className="col-span-3 divide-y">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                !email.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  className={`text-gray-400 hover:text-yellow-500 ${
                    email.starred ? 'text-yellow-500' : ''
                  }`}
                >
                  <Star size={20} />
                </button>
                <div className="flex-1">
                  <p className="font-semibold">{email.from}</p>
                  <p className="font-medium">{email.subject}</p>
                  <p className="text-gray-600 truncate">{email.preview}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(email.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">New Message</h2>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4 space-y-4">
              <input
                type="email"
                placeholder="To"
                value={newEmail.to}
                onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Subject"
                value={newEmail.subject}
                onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Message"
                value={newEmail.message}
                onChange={(e) => setNewEmail({ ...newEmail, message: e.target.value })}
                className="w-full p-2 border rounded-lg h-64 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    multiple
                  />
                  <Paperclip className="text-gray-500 hover:text-gray-700" />
                </label>
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Send size={20} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Email;