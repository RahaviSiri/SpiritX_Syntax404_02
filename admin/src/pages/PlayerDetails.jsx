import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaUniversity,
  FaClipboardList,
  FaRunning,
  FaBasketballBall,
  FaBowlingBall,
  FaTrophy,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

const PlayerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPlayerDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4500/api/player/getPlayerbyId/${id}`
      );
      setPlayer(data.player);
      setLoading(false);
    } catch (error) {
      setError("Error fetching player details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayerDetails();
  }, [id]);

  const handleEdit = (id) => {
    navigate(`/add/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:4500/api/player/delete/${id}`
      );
      if (response.data.success) {
        toast.success("Player deleted successfully");
        navigate(`/players`);
      }
    } catch (error) {
      console.error("Error deleting Player:", error);
      toast.error("Failed to delete Player");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div className="mx-10 w-full flex justify-center">
      <div className="w-full my-8 p-6 bg-[#c9a3ef] text-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={player.image}
            alt={player.name}
            className="w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-white"
          />

          <h2 className="text-3xl font-bold mt-4">{player.name}</h2>

          <p className="mt-3">{player.university}</p>
          <p className="text-xl md:text-3xl text-purple-900 mt-3">
            {player.category}
          </p>
          <div className="flex items-center justify-between gap-3 mt-4">
            
            <button onClick={() => handleEdit(player._id)} className="flex gap-2 border-2 rounded-xl p-2 md:p-3">
              Edit
            <FaEdit
              
              className="text-xl cursor-pointer text-black"
            />
            </button>
            <button onClick={() => handleDelete(player._id)}
              className="flex gap-2 border-2 rounded-xl p-2 md:p-3">
                Delete
                <FaTrashAlt className="text-xl cursor-pointer text-red-500"/>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-[#9966CC] p-4 rounded-lg flex flex-col items-center">
            <FaUniversity className="text-3xl mb-2" />
            <p className="font-bold">University</p>
            <p>{player.university}</p>
          </div>
          <div className="bg-[#9966CC] p-4 rounded-lg flex flex-col items-center">
            <FaClipboardList className="text-3xl mb-2" />
            <p className="font-bold">Category</p>
            <p>{player.category}</p>
          </div>
          <div className="bg-[#9966CC] p-4 rounded-lg flex flex-col items-center">
            <FaRunning className="text-3xl mb-2" />
            <p className="font-bold">Total Runs</p>
            <p>{player.totalRuns}</p>
          </div>
          <div className="bg-[#9966CC] p-4 rounded-lg flex flex-col items-center">
            <FaBasketballBall className="text-3xl mb-2" />
            <p className="font-bold">Balls Faced</p>
            <p>{player.ballsFaced}</p>
          </div>
          <div className="bg-[#9966CC] p-4 rounded-lg flex flex-col items-center">
            <FaTrophy className="text-3xl mb-2" />
            <p className="font-bold">Innings Played</p>
            <p>{player.inningsPlayed}</p>
          </div>
          <div className="bg-[#9966CC] p-4 rounded-lg flex flex-col items-center">
            <FaBowlingBall className="text-3xl mb-2" />
            <p className="font-bold">Wickets</p>
            <p>{player.wickets}</p>
          </div>
          <div className="bg-[#9966CC] p-4 rounded-lg flex flex-col items-center">
            <FaBasketballBall className="text-3xl mb-2" />
            <p className="font-bold">Overs Bowled</p>
            <p>{player.oversBowled}</p>
          </div>
          <div className="bg-[#9966CC] p-4 rounded-lg flex flex-col items-center">
            <FaRunning className="text-3xl mb-2" />
            <p className="font-bold">Runs Conceded</p>
            <p>{player.runsConceded}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
