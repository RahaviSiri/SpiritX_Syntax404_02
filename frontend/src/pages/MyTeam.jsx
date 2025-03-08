import React, { useState, useEffect } from "react";

const MyTeam = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = "USER_ID_FROM_AUTH"; // Replace with actual logged-in user ID from auth system

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`http://localhost:4000/api/player/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setPlayers(data.players);
          } else {
            console.error("No players found:", data.message);
            console.log(error);
          }
        })
        .catch((error) => {console.error("Error fetching players:", error)
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Players</h2>

      {loading ? (
        <div>Loading...</div>
      ) : players.length > 0 ? (
        <table className="border-collapse border w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
              <th className="border p-2">Player Name</th>
              <th className="border p-2">University</th>
              
              <th className="border p-2">Budget</th>
              
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id} className="text-center">
                <td className="border p-2">
                  <img src={player.image} alt={player.name} width="50" className="rounded-md" />
                </td>
                <td className="border p-2">{player.name}</td>
                <td className="border p-2">{player.university}</td>
                
                <td className="border p-2">${player.budget}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-red-500">No players found.</p>
      )}
    </div>
  );
};

export default MyTeam;
