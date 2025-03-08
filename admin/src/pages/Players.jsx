import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import PlayerCard from '../components/PlayerCard';

const Players = () => {
  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4500/api/player/get-players");
      if (data.success) {
        setPlayers(data.players);
      } else {
        toast.error("Error getting players");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className='m-5'>
      {/* Players List Heading */}
      <h1 className="text-2xl font-bold text-purple-800 text-center mb-8 mt-4">🏅 Players List</h1>
      
      {players.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {players.map((item, index) => (
            <PlayerCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center">No players available</p>
      )}
    </div>
  );
};

export default Players;
