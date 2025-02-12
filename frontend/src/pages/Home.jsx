// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Mail, Phone, MessageCircle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageSquare className="w-16 h-16 text-blue-500" />,
      title: "Chat",
      description: "Instant messaging with real-time updates",
      color: "bg-blue-50 hover:bg-blue-100",
      route: "/chat",
      textColor: "text-blue-700"
    },
    {
      icon: <Mail className="w-16 h-16 text-emerald-500" />,
      title: "Email",
      description: "All your email accounts unified",
      color: "bg-emerald-50 hover:bg-emerald-100",
      route: "/email",
      textColor: "text-emerald-700"
    },
    {
      icon: <MessageCircle className="w-16 h-16 text-violet-500" />,
      title: "SMS",
      description: "Text messaging made simple",
      color: "bg-violet-50 hover:bg-violet-100",
      route: "/sms",
      textColor: "text-violet-700"
    },
    {
      icon: <Phone className="w-16 h-16 text-rose-500" />,
      title: "Calls",
      description: "Voice and video calling",
      color: "bg-rose-50 hover:bg-rose-100",
      route: "/calls",
      textColor: "text-rose-700"
    }
  ];

  return (
    <div className="max-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-screen flex flex-col">
        {/* Hero Section */}
        <div className="text-center pt-8 pb-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to <span className="text-blue-600">Omni Messenger</span>
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Choose your communication method
          </p>
        </div>

        {/* Features Grid */}
        <div className="flex-grow flex items-center justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full max-w-6xl">
            {features.map((feature) => (
              <button
                key={feature.title}
                onClick={() => navigate(feature.route)}
                className={`${feature.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-full group`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className={`text-3xl font-bold ${feature.textColor}`}>
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;