import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaUniversity,
  FaClipboardList,
  FaRunning,
  FaBasketballBall,
  FaBowlingBall,
  FaTrophy,
} from "react-icons/fa";
import Players from "@/pages/Players";

const PlayersDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchPlayerDetails();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return player ? (

    <div className="mx-6 my-8 p-6 bg-violet-300 text-white rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Player Image */}
        <div className="flex-shrink-0">
          <img
            src={player.image}
            alt={player.name}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Player Details */}
        <div className="text-left">
          <h2 className="text-3xl font-bold text-purple-900 text-center md:text-left">
            {player.name}
          </h2>
          <p className="mt-2 text-lg flex items-center gap-2 text-gray-500 text-center md:text-left">
            {player.university}
          </p>
          <p className="text-xl font-semibold mt-2 text-purple-900 text-center md:text-left">
            {player.category}
          </p>

          {/* Player Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-lg">
            <p className="flex items-center gap-2">
              <FaRunning /> Total Runs: {player.totalRuns}
            </p>
            <p className="flex items-center gap-2">
              <FaBasketballBall /> Balls Faced: {player.ballsFaced}
            </p>
            <p className="flex items-center gap-2">
              <FaTrophy /> Innings Played: {player.inningsPlayed}
            </p>
            <p className="flex items-center gap-2">
              <FaBowlingBall /> Wickets: {player.wickets}
            </p>
            <p className="flex items-center gap-2">
              <FaBasketballBall /> Overs Bowled: {player.oversBowled}
            </p>
            <p className="flex items-center gap-2">
              <FaRunning /> Runs Conceded: {player.runsConceded}
            </p>
          </div>
        </div>
      </div>
    </div>

  ) : (
    <p className="text-center">No players found</p>
  );
};

export default PlayersDetails;
