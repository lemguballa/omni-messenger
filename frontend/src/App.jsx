import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Email from "./pages/Email.jsx";
import SMS from "./pages/SMS.jsx";
import Calls from "./pages/Calls.jsx";

function App() {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 text-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold text-blue-600">Omni Messenger</h1>
          <div className="space-x-4">
            <NavLink to="/" className="text-gray-700 hover:text-blue-500">Home</NavLink>
            <NavLink to="/chat" className="text-gray-700 hover:text-blue-500">Chat</NavLink>
            <NavLink to="/email" className="text-gray-700 hover:text-blue-500">Email</NavLink>
            <NavLink to="/sms" className="text-gray-700 hover:text-blue-500">SMS</NavLink>
            <NavLink to="/calls" className="text-gray-700 hover:text-blue-500">Calls</NavLink>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-5xl mx-auto py-10 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/email" element={<Email />} />
          <Route path="/sms" element={<SMS />} />
          <Route path="/calls" element={<Calls />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
