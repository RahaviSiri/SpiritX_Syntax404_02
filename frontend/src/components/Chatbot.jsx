import { useState } from "react";
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
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error fetching response.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    navigate("/"); // Navigate back to the temporary page
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Loading..." : "Send"}
      </button>
      <p><strong>Response:</strong> {response}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default Chatbot;
