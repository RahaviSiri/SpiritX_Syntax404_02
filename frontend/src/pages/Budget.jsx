import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets.js";
import { FaWallet, FaUser, FaUsers } from 'react-icons/fa';  // Importing icons from react-icons

const INITIAL_BUDGET = 9000000;

const Budget = ({ userId }) => {
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [team, setTeam] = useState([
    { "_id": "player1", "name": "John Doe", "budget": 1500000 },
    { "_id": "player2", "name": "Jane Smith", "budget": 1200000 },
    { "_id": "player3", "name": "Alice Brown", "budget": 1000000 }
  ]);

  useEffect(() => {
    axios
      .get(`/api/team/${userId}`)
      .then(() => {
        // If API data exists, use it; otherwise, fall back to the hardcoded team
        const teamData = team;
        // const teamData = res.data.length > 0 ? res.data : [];
        setTeam(teamData);

        // Calculate the total spent budget
        const totalSpent = teamData.reduce((sum, player) => sum + player.budget, 0);
        setBudget(INITIAL_BUDGET - totalSpent);
      })
      .catch((error) => {
        console.error(error);
        // If API fails, retain hardcoded data and use it
        const totalSpent = team.reduce((sum, player) => sum + player.budget, 0);
        setBudget(INITIAL_BUDGET - totalSpent);
      });
  }, [userId]);

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${assets.BudgetBg})` }}>
      <div className="max-w-4xl mx-auto p-6 mt-10 bg-white bg-opacity-80 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {/* <FaWallet className="inline-block mr-2 text-3xl" /> */}
          Budget Tracker
        </h2>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center text-lg font-medium text-gray-700">
            <div className="flex items-center">
              <FaWallet className="mr-2 text-xl text-purple-700" />
              <p><strong>Total Budget:</strong> Rs. {INITIAL_BUDGET.toLocaleString()}</p>
            </div>
            <div className="flex items-center">
              <FaWallet className="mr-2 text-xl text-purple-700" />
              <p><strong>Remaining Budget:</strong> Rs. {budget.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-purple-600 mb-4">
          <FaUsers className="inline-block mr-2 text-xl" />
          Your Team
        </h3>
        {team.length > 0 ? (
          <ul className="space-y-4">
            {team.map((player) => (
              <li
                key={player._id}
                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 hover:bg-purple-50"
              >
                <div className="flex items-center">
                  <FaUser className="mr-2 text-purple-700" />
                  <span className="text-lg font-medium text-gray-800">{player.name}</span>
                </div>
                <span className="text-lg font-medium text-purple-700">Rs. {player.budget.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-gray-500">No players selected.</p>
        )}
      </div>
    </div>
  );
};

export default Budget;
