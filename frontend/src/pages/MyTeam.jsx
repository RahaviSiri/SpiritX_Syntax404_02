import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

const MyTeam = () => {
  const { team, fetchTeam, backendURL, uToken } = useContext(UserContext);
  const [totalPoints, setTotalPoints] = useState(0);

  const fetchPoints = async (id) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/budget/get-player-points-and-budget/${id}`
      );
      return data.success ? data.playerPoints : 0;
    } catch (error) {
      return 0;
    }
  };

  const fetchAllPoints = async () => {
    let total = 0;

    await Promise.all(
      team.map(async (player) => {
        const points = await fetchPoints(player.playerId);
        total += points;
      })
    );
    setTotalPoints(total);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  useEffect(() => {
    if (team.length === 11) { 
      fetchAllPoints();
    }
  }, [team]);

  const removePlayer = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/team/remove-team-players`, 
        { id },
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      );
      if (data.success) {
        fetchTeam();
      } else {
        toast.error("Error in deleting");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Your Team</h2>
      
      <table className="border-collapse border w-full mt-4">
        <thead>
          <tr className="bg-purple-200">
            <th className="border p-2">Player Name</th>
            <th className="border p-2">University</th>
            <th className="border p-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {team.map((player) => (
            <tr key={player._id} className="text-center">
              <td className="border p-2">{player.name}</td>
              <td className="border p-2">{player.university}</td>
              <td className="border p-2 text-black"> 
                <button
                  className="bg-purple-700 text-white p-2 text-xs md:p-3 rounded-xl md:text-lg"
                  onClick={() => removePlayer(player.playerId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show total points only if the team has 1 player (for testing) */}
      {team.length === 11 && (
        <p className="mt-6 text-lg font-bold text-purple-700">
          Total Points of Team: {totalPoints}
        </p>
      )}
    </div>
  );
};

export default MyTeam;
