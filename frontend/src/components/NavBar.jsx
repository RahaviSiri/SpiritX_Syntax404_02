import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io"; // Icons for menu toggle
import { assets } from "../assets/assets.js";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo with Icon */}
        <Link to="/" className="flex items-center text-xl font-bold">
          <img
            src={assets.icon}
            alt="Logo"
            className="w-9 h-9 rounded-full border-2 border-white mr-2"
          />
          MoraSpirit11
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/players" className="hover:text-gray-300">Players</Link>
          <Link to="/select-team" className="hover:text-gray-300">Select Team</Link>
          <Link to="/my-team" className="hover:text-gray-300">Team</Link>
          <Link to="/budget" className="hover:text-gray-300">Budget</Link>
          <Link to="/leaderboard" className="hover:text-gray-300">Leaderboard</Link>
        </div>

        {/* Profile Icon (Visible only on Desktop) */}
        <Link to="/my-profile" className="text-3xl hidden md:block">
          <FaUserCircle />
        </Link>

        {/* Hamburger Menu (Only Visible on Mobile) */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Menu (Slide-down effect) */}
      <div
        className={`md:hidden bg-purple-800 text-white flex flex-col items-center space-y-4 p-4 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}
      > <Link
          to="/my-profile"
          className="text
           hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
      Profile
      </Link>
      <Link
          to="/"
          className="hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/players"
          className="hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
          Players
        </Link>
        <Link
          to="/select-team"
          className="hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
          Select Team
        </Link>
        <Link
          to="/my-team"
          className="hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
          Team
        </Link>
        <Link
          to="/budget"
          className="hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
          Budget
        </Link>
        <Link
          to="/leaderboard"
          className="hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
          Leaderboard
        </Link>

        {/* Profile Icon in Mobile Menu */}
        
      </div>
    </nav>
  );
}
