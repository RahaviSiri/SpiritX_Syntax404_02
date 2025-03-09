import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { UserContext } from "@/context/UserContext";

const CategoryPlayers = () => {
  const [playersInTeam, setPlayersInTeam] = useState({});
  const [teamCount, setTeamCount] = useState(0);
  const { fetchTeam, team, backendURL } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const maxPlayers = 11;
  const { category } = useParams();
  const [players, setPlayers] = useState([]);
  const { uToken } = useContext(UserContext);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendURL}/api/player/category-player/${category}`
      );
      if (data.success) {
        setPlayers(data.players);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const addPlayerToTeam = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/team/add-team-players`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      );
      if (data.success) {
        fetchTeam();
        checkPlayer(id);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error adding player:", err.response?.data);
      toast.error(err.response?.data?.message || "Error adding player");
    }
  };

  const checkPlayer = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/team/check-player`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      );
      setPlayersInTeam((prevState) => ({
        ...prevState,
        [id]: data.success,
        // Update the specific player by ID
      }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const buttonClickHandler = (id) => {
    addPlayerToTeam(id);
    checkPlayer(id);
  };

  useEffect(() => {
    fetchTeam();
    setTeamCount(team?.length);
  }, [team]);

  useEffect(() => {
    fetchPlayers();
  }, [category]);

  // Update isInTeam for each player
  useEffect(() => {
    players.forEach((player) => {
      checkPlayer(player._id);
    });
  }, [players]);

  if (loading)
    return <div className="text-center text-xl text-gray-700">Loading...</div>;

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Available Players</h2>
        <div className="text-lg font-bold px-4 py-2 bg-gray-100 rounded-lg shadow-md">
          {teamCount}/{maxPlayers}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players.length > 0 ? (
          players.map((player) => (
            <div
              key={player._id}
              className="bg-white border border-gray-300 rounded-lg p-4 shadow-md text-center transform transition duration-300 hover:translate-y-[-5px]"
            >
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-40 object-contain rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-800">
                  {player.name}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>University:</strong> {player.university}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Budget:</strong> ${player.budget}
                </p>
                {/* Show the "Add" button only if there is space and the player is not in the team */}
                {teamCount < maxPlayers && !playersInTeam[player._id] && (
                  <button
                    onClick={() => buttonClickHandler(player._id)}
                    className={`w-full py-2 mt-4 text-white font-semibold rounded-md transition duration-300 bg-purple-300 hover:bg-purple-700`}
                  >
                    Add
                  </button>
                )}
                {/* Optionally, you can disable the button if the player is already in the team */}
                {playersInTeam[player._id] && (
                  <button
                    disabled
                    className="w-full py-2 mt-4 text-white font-semibold rounded-md bg-gray-400 cursor-not-allowed"
                  >
                    Already in Team
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No players available</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPlayers;
