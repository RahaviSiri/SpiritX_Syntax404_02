import React from "react";
import { NavLink } from "react-router-dom";
import { Plus, Users, BarChart } from "lucide-react"; 

const SideBar = () => {
  return (
    <div className="min-h-screen w-24 bg-purple-900 text-white flex flex-col gap-6 p-5 shadow-lg 
    md:w-64 lg:w-90 sm:w-20 sm:hover:w-64 transition-all duration-300 ease-in-out">
      
      <NavLink 
        to="/add" 
        className={({ isActive }) =>
          `flex items-center gap-3 mt-5 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
           hover:bg-purple-700 ${isActive ? "border-r-4 border-white bg-purple-800" : ""}`
        }
      >
        <Plus className="w-5 h-5" /> 
        <p className="hidden md:block">Add Player</p> 
      </NavLink>
      
      <NavLink 
        to="/players" 
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
           hover:bg-purple-700 ${isActive ? "border-r-4 border-white bg-purple-800" : ""}`
        }
      >
        <Users className="w-5 h-5" /> 
        <p className="hidden md:block">Players</p> 
      </NavLink>
      
      <NavLink 
        to="/summary" 
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
           hover:bg-purple-700 ${isActive ? "border-r-4 border-white bg-purple-800" : ""}`
        }
      >
        <BarChart className="w-5 h-5" /> 
        <p className="hidden md:block">Summary</p> 
      </NavLink>
      
    </div>
  );
};

export default SideBar;
