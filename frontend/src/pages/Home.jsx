import { Link } from "react-router-dom";


const players = [
  {
    id: 1,
    name: "John Doe",
    university: "Harvard University",
    profilePic: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    university: "Stanford University",
    profilePic: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Mike Johnson",
    university: "MIT",
    profilePic: "https://via.placeholder.com/150",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header
        className="relative w-full h-64 bg-cover bg-center flex items-center justify-center text-purple-700 text-6xl font-bold"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?sports')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Semi-transparent black overlay */}
        <span className="relative z-10">Welcome to Fantasy League</span> {/* Ensures the text is above the overlay */}
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Featured Players</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {players.map((player) => (
            <div key={player.id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <img src={player.profilePic} alt={player.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-2">{player.name}</h3>
              <p className="text-gray-600">{player.university}</p>
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
