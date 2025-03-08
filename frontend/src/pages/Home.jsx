import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";  // Correct named import

const players = [
  {
    id: 1,
    name: "John Doe",
    university: "Harvard University",
    profilePic: "https://via.placeholder.com/150", // Dummy image path
  },
  {
    id: 2,
    name: "Jane Smith",
    university: "Stanford University",
    profilePic: "https://via.placeholder.com/150", // Dummy image path
  },
  {
    id: 3,
    name: "Mike Johnson",
    university: "MIT",
    profilePic: "https://via.placeholder.com/150", // Dummy image path
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header
        className="relative w-full h-150 bg-cover bg-center flex items-start justify-center text-white text-6xl"
        style={{
          backgroundImage: `url(${assets.background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Semi-transparent black overlay */}
        <div className="absolute inset-0 bg-black opacity-55"></div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 p-6">
          <span className="relative z-10 text-6xl font-serif mt-10">Welcome to MoraSpirit11🏏</span> {/* Classic serif font, no bold */}
          
          <div className="bg-black text-white p-6 rounded-lg opacity-75 mt-6 max-w-6xl mx-auto transition-all duration-1000 transform hover:scale-105">
            <p className="text-lg font-serif">
              MoraSpirit11 is bringing cricket fans the ultimate fantasy experience with Spirit11! Build your dream team, strategize like a pro, and compete with the best from universities across the country. With real-time player stats, smart budget management, and our AI-powered Spiriter Chatbot, you’ll have everything you need to dominate the leaderboard! Are you ready to showcase your cricket knowledge and rise to the top? Play. Compete. Conquer. 🏆
            </p>
          </div>
        </div>
      </header>

      {/* Featured Players Section */}
      <div className="max-w-4xl mx-auto p-6 mt-12 text-center">
        <h2 className="text-5xl font-semibold text-purple-700 mb-4">Featured Players</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center bg-purple-400 p-6 rounded-lg shadow-lg">
          {players.map((player) => (
            <div key={player.id} className="relative bg-white p-4 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-all duration-500">
              {/* Image with hover effect */}
              <div className="group relative flex justify-center">
                <img 
                  src={assets.cricketer} 
                  alt={player.name} 
                  className="w-45 h-72 object-cover rounded-lg transition-all duration-500 transform group-hover:scale-110 group-hover:opacity-90"  // Reduced width to make it portrait
                />
                
                {/* Hidden details, appear on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-20 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform group-hover:translate-y-0 group-hover:scale-105">
                  <h3 className="text-2xl font-normal">{player.name}</h3> {/* Larger font for name */}
                  <p className="text-lg mt-4">{player.university}</p> {/* Added margin for more space */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/players" className="text-purple-700 font-semibold hover:underline">See more</Link>
        </div>
      </div>
    </div>
  );
}
