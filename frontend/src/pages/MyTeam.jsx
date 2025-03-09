import { UserContext } from '@/context/UserContext';
import React, { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from "axios"

const MyTeam = () => {
  const { team, fetchTeam, backendURL, uToken } = useContext(UserContext);
  const totalPoints = 0;

  useEffect(() => {
    fetchTeam();
  }, []);

  // Display a message if no team is available.
  if (!team || team.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Your Team</h2>
        <p className="mt-4 text-red-500">No players found in your team.</p>
      </div>
    );
  }

  const removePlayer = async (id) => {
    try {
      console.log("Removing player with ID:", id);
      const { data } = await axios.post(
        `${backendURL}/api/team/remove-team-players`, 
        { id },
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      );
      console.log("Remove response:", data); 
      if (data.success) {
        fetchTeam();
      } else {
        toast.error("Error in deleting");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Team</h2>
      
      {/* Displaying the team players in a table */}
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
      <p className="mt-6">Total Points of Team : {totalPoints}</p>
    </div>
  );
};

export default MyTeam;
