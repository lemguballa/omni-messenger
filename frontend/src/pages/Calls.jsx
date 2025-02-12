import { useState, useEffect } from "react";
import { Device } from "@twilio/voice-sdk";
import { Phone, X, Delete } from "lucide-react";

const Calls = () => {
  const [callTo, setCallTo] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    async function initializeTwilioDevice() {
      try {
        const response = await fetch("http://localhost:5000/token");
        const data = await response.json();
        if (data.token) {
          const twilioDevice = new Device(data.token, { logLevel: "info" });

          twilioDevice.on("registered", () => console.log("Twilio Device Registered."));
          twilioDevice.on("error", (error) => console.error("Twilio Error:", error));

          twilioDevice.on("incoming", (connection) => {
            console.log("Incoming call from:", connection.parameters.From);
            if (window.confirm("Accept call?")) {
              connection.accept();
            } else {
              connection.reject();
            }
          });

          twilioDevice.register();
        } else {
          console.error("Failed to get Twilio token.");
        }
      } catch (error) {
        console.error("Error initializing Twilio Device:", error);
      }
    }

    initializeTwilioDevice();
  }, []);

  const handleCall = async () => {
    if (!callTo) {
      alert("Please enter a phone number.");
      return;
    }

    setIsCalling(true);

    try {
      const response = await fetch("http://localhost:5000/makeCall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: `+${callTo}` }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Call started:", result);
      } else {
        console.error("Error making call:", result.error);
      }
    } catch (error) {
      console.error("Call request failed:", error);
    }

    setIsCalling(false);
  };

  const handleKeypadPress = (value) => {
    setCallTo(prev => prev + value);
  };

  const handleBackspace = () => {
    setCallTo(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setCallTo("");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Phone</h2>

      <div className="mb-6">
        <div className="relative">
          <div className="flex items-center border rounded-lg">
            <span className="pl-4 text-xl font-mono text-gray-500">+</span>
            <input
              type="text"
              value={callTo}
              onChange={(e) => setCallTo(e.target.value)}
              placeholder="1 (555) 000-0000"
              className="p-3 rounded-lg w-full text-xl text-center font-mono border-0 focus:ring-0 focus:outline-none"
            />
            {callTo && (
              <button 
                onClick={handleClear}
                className="pr-3 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
          <button
            key={num}
            onClick={() => handleKeypadPress(num)}
            className="p-4 text-2xl font-semibold rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {num}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={handleBackspace}
          className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
        >
          <Delete size={24} />
        </button>
        
        <button
          onClick={handleCall}
          disabled={isCalling || !callTo}
          className="col-span-2 p-4 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Phone size={24} />
          {isCalling ? "Calling..." : "Call"}
        </button>
      </div>
    </div>
  );
};

export default Calls;