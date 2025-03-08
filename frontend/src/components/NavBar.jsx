import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5"; // Importing close icon

export default function NavBar() {
  const [isGridVisible, setIsGridVisible] = useState(false);

  const toggleGrid = () => {
    setIsGridVisible(!isGridVisible);
  };

  return (
    <nav className="bg-purple-700 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🏆 Fantasy League</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/players" className="hover:text-gray-300">Players</Link>
          <Link to="/select-team" className="hover:text-gray-300">Select Team</Link>
          <Link to="/my-team" className="hover:text-gray-300">Team</Link>
          <Link to="/budget" className="hover:text-gray-300">Budget</Link>
          <Link to="/leaderboard" className="hover:text-gray-300">LeaderBoard</Link>
        </div>
        <button onClick={toggleGrid} className="text-3xl cursor-pointer">
          <FaUserCircle />
        </button>
      </div>

      {/* Profile Grid (Sliding Sidebar) */}
      <div
        className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-xl p-6 transition-all duration-500 ease-in-out ${
          isGridVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={toggleGrid} 
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl"
        >
          <IoClose />
        </button>

        {/* User Information Grid */}
        <h2 className="z-50 text-2xl font-semibold text-purple-700 mb-4">User Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">Name:</h3>
            <p className="text-gray-600">John Doe</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold">University:</h3>
            <p className="text-gray-600">Harvard University</p>
          </div>
          {/* Add more user details if needed */}
        </div>
      </div>
    </nav>
  );
}
