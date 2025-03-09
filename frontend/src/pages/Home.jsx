import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js"; // Import assets

const players = [
  {
    id: 1,
    name: "John Doe",
    university: "Harvard University",
  },
  {
    id: 2,
    name: "Jane Smith",
    university: "Stanford University",
  },
  {
    id: 3,
    name: "Mike Johnson",
    university: "MIT",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
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

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-purple-400 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center"
            >
              <div className="relative bg-white p-4 rounded-lg shadow-lg overflow-hidden w-full max-w-xs">
                {/* Image */}
                <div className="group relative w-full flex justify-center">
                  <img
                    src={assets.cricketer}
                    alt={player.name}
                    className="w-full max-w-[200px] h-auto object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Details */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-2xl font-bold">{player.name}</h3>
                    <p className="text-lg mt-2">{player.university}</p>
                  </div>
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
          className="mt-4 inline-block bg-white text-purple-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-200 transition"
        >
          Select Your Team
        </Link>
      </div>
    </div>
  );
}
