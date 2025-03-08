import React, { useState, useEffect } from "react";
import { assets} from "../assets/assets.js";


import { useNavigate } from "react-router-dom";
import './SelectTeam.css'

const SelectTeam = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetch("/api/categories") // Adjust the API endpoint as needed
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryClick = (category) => { navigate("/category-players");};

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Select Your Team
      </h1>
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
        Choose the players from the categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl cursor-pointer">
        {/* Batsman Category */}
        <div className="category-card flex flex-col items-center shadow-lg rounded-xl p-4 w-full h-64 relative group" onClick={() => handleCategoryClick("batsman")}>
          <div className="flip-container w-full h-full">
            <div className="flip-card">
              <div className="flip-card-front w-full h-full flex flex-col justify-center items-center bg-purple-300 rounded-xl shadow-lg p-4">
                <img
                  src={assets.batsman}
                  alt="Batsman"
                  className="w-40 h-40 object-contain rounded-full"
                />
                <p className="mt-2 font-medium text-lg">Batsman</p>
              </div>
              <div className="flip-card-back w-full h-full flex justify-center items-center bg-purple-300 p-6 text-black rounded-xl shadow-lg">
                <div>
                  <p className="font-semibold">A batsman specializes in scoring runs by hitting the ball with precision. They play a key role in building partnerships and setting competitive totals.</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bowler Category */}
        <div className="category-card flex flex-col items-center bg-purple-300te shadow-lg rounded-xl p-4 w-full h-64 relative group" onClick={() => handleCategoryClick("bowler")}>
          <div className="flip-container w-full h-full">
            <div className="flip-card">
              <div className="flip-card-front w-full h-full flex flex-col justify-center items-center bg-purple-300 rounded-xl shadow-lg p-4">
                <img
                  src={assets.bowler}
                  alt="Bowler"
                  className="w-40 h-40 object-contain rounded-full"
                />
                <p className="mt-2 font-medium text-lg">Bowler</p>
              </div>
              <div className="flip-card-back w-full h-full flex justify-center items-center bg-purple-300 p-6 text-black rounded-xl shadow-lg">
                <div>
                  <p className="font-semibold">A bowler’s job is to dismiss the batsman through varied deliveries. They aim to control the game and create opportunities for the team to take wickets.</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All-rounder Category */}
        <div className="category-card flex flex-col items-center  shadow-lg rounded-xl p-4 w-full h-64 relative group" onClick={() => handleCategoryClick("all-rounder")}>
          <div className="flip-container w-full h-full rounded-full">
            <div className="flip-card">
              <div className="flip-card-front w-full h-full flex flex-col justify-center items-center bg-purple-300 rounded-xl shadow-lg p-4 ">
                <img
                  src={assets.all_rounder}
                  alt="All-rounder"
                  className="w-40 h-40 object-contain rounded-full"
                />
                <p className="mt-2 font-medium text-lg">All-rounder</p>
              </div>
              <div className="flip-card-back w-full h-full flex justify-center items-center bg-purple-300 text-white p-6 rounded-xl shadow-lg">
                <div>
                  <p className="font-semibold">An all-rounder excels in both batting and bowling, offering flexibility to the team. They provide balance and contribute in all aspects of the game.</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTeam;
