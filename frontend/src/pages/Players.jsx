import React from "react";
import  { assets } from "../assets/assets.js"

const PlayerCard = ({ player }) => {
  return (
    <div className="w-70 p-6 bg-[#9535b8] text-white rounded-xl shadow-2xl flex-shrink-0 relative transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-3xl">
      {/* Role Icon in top-right corner */}
      <div className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-gray-000">
        <img
          src={assets[player.role]} // Use role dynamically from player data
          alt={player.role} // Alt text based on role
          className="w-full h-full object-cover"
        />
      </div>

      {/* Player Image */}
      <div className="flex justify-center mb-4">
        <img
          src={assets.athlete} // Use athlete image from assets.js
          alt={player.name}
          className="w-58 h-82 rounded-full border-4 border-white object-cover"
        />
      </div>

      {/* Player Name */}
      <h2 className="text-2xl font-bold text-center">{player.name}</h2>
      <p className="text-center text-lg text-gray-300">{player.University}</p>
    </div>
  );
};

// Sample player data with different universities and roles
const playerData = [
  {
    name: "Danushka Kumara",
    University: "University of Moratuwa",
    role: "all", // Ensure this matches the key in assets.js
  },
  {
    name: "Anuradha Perera",
    University: "University of Colombo",
    role: "bat", // Ensure this matches the key in assets.js
  },
  {
    name: "Kamal Wickramasinghe",
    University: "University of Sri Jayewardenepura",
    role: "ball", // Ensure this matches the key in assets.js
  },
  {
    name: "Nadeesha Priyadarshani",
    University: "University of Peradeniya",
    role: "all", // Ensure this matches the key in assets.js
  },
];

const PlayerPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-150">
      {/* Players List Heading */}
      <h1 className="text-5xl font-bold text-black mb-9">🏅 Players List</h1>
      
      {/* Flex container to display cards side by side */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Render the player cards */}
        {playerData.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayerPage;






