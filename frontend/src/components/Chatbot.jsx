import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!message) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4500/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
      setMessage('');  
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error fetching response. Please try again.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    navigate("/"); // Navigate back to the temporary page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-purple-700 p-4">
      <div className="max-w-md w-full bg-purple-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">Chatbot</h2>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
          className="w-full p-3 mb-4 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors mb-4 disabled:bg-purple-300"
        >
          {loading ? "Loading..." : "Send"}
        </button>

        <p className="text-center mb-4">
          <strong>Response:</strong> {response}
        </p>

        <button
          onClick={handleClose}
          className="w-full p-3 bg-gray-300 text-purple-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
