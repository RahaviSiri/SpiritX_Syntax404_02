import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const { backendURL } = useContext(UserContext);
  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/player/get-players`);
      if (data.success) {
        setPlayers(data.players.slice(0, 3)); 
      } else {
        toast.error("Error getting players");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Hero Section */}
      <header
        className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${assets.background})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center max-w-3xl p-6">
          <h1 className="text-2xl md:text-5xl font-serif">
            Welcome to MoraSpirit11!
          </h1>
          <p className="bg-black text-white p-4 rounded-lg opacity-80 mt-4 text-lg">
            Build your dream team, strategize like a pro, and compete with the best from universities across the country! 🏆
          </p>
          <Link
            to="/players"
            className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Featured Players Section */}
      <div className="max-w-6xl mx-auto p-6 mt-12 text-center">
        <h2 className="text-4xl font-semibold text-purple-700 mb-6">
          Featured Players
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-purple-400 p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-xs">
                <div className="w-full h-[200px] overflow-hidden flex justify-center">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-semibold">{player.name}</h3>
                  <p className="text-lg mt-2">{player.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/players"
            className="text-purple-700 font-semibold hover:underline text-lg"
          >
            See more players →
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-purple-700 text-white py-12 mt-12 text-center">
        <h2 className="text-4xl font-bold">Ready to Play?</h2>
        <p className="text-lg mt-2">
          Start building your fantasy cricket team today!
        </p>
        <Link
          to="/select-team"
          onClick={() => window.scrollTo(0, 0)}
          className="mt-4 inline-block bg-white text-purple-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-200 transition"
        >
          Select Your Team
        </Link>
      </div>

      {/* Fixed Spiriter Button */}
      <Link
        to="/chatbox"
        className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-semibold hover:bg-purple-700 transition"
      >
        Spiriter
      </Link>
    </div>
  );
}
