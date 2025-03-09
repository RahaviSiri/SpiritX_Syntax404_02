import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { assets } from "../assets/assets.js";
import { FaWallet, FaUser, FaUsers } from "react-icons/fa";
import { UserContext } from "@/context/UserContext.jsx";

const INITIAL_BUDGET = 9000000;

const Budget = () => {
  // const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [playerBudgets, setPlayerBudgets] = useState({});
  const { fetchTeam, team, backendURL } = useContext(UserContext);

  const fetchBudget = async (id) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/budget/get-player-points-and-budget/${id}`
      );
      if (data.success) {
        return data.playerBudget;
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  };

  const fetchAllBudgets = async () => {
    const budgets = {};
    for (let player of team) {
      budgets[player.playerId] = await fetchBudget(player.playerId);
    }
    setPlayerBudgets(budgets);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    if (team.length > 0) {
      fetchAllBudgets();
    }
  }, [team]);

  // Calculate remaining budget
  const totalSpent = Object.values(playerBudgets).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const remainingBudget = INITIAL_BUDGET - totalSpent;

  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.BudgetBg})` }}
    >
      <div className="max-w-4xl mx-auto p-10 bg-opacity-80 rounded-2xl shadow-lg">
        <h2 className="text-xl md:text-3xl font-bold text-center text-purple-200 mb-6">
          Budget Tracker
        </h2>

        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center text-lg font-medium text-gray-700">
            <div className="flex items-center flex-col md:flex-row md:gap-3 justify-center gap-2">
              <FaWallet className="text-2xl md:text-xl text-purple-700" />
              <p className="text-sm md:text-md text-left">
                <strong>Total Budget:</strong> <br /> Rs.{" "}
                {INITIAL_BUDGET.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
              <FaWallet className="text-2xl md:text-xl text-purple-700" />
              <p className="text-sm md:text-md text-left">
                <strong>Remaining Budget:</strong> <br /> Rs.{" "}
                {remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-200 mb-4">
          <FaUsers className="inline-block mr-2" />
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
                  <span className="text-sm md:text-lg font-medium text-gray-800">
                    {player.name}
                  </span>
                </div>
                <span className=" text-sm md:text-lg font-medium text-purple-700">
                  Rs. {playerBudgets[player.playerId]?.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No players selected.
          </p>
        )}
      </div>
    </div>
  );
};

export default Budget;
