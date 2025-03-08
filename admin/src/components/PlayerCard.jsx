import React from 'react';

const PlayerCard = ({ item }) => {
  // Destructure and check if values exist
  const { image, name, university } = item || {};

  return (
    <div className="flex items-center justify-center flex-col bg-purple-300 text-white rounded-xl shadow-2xl flex-shrink-0 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-3xl p-4 ">
      {/* Player Image */}
      <div className="flex justify-center mb-4">
        <img
          src={image} 
          alt={name}
          className="w-32 h-32 rounded-full border-4 border-white object-cover"
        />
      </div>
  
      {/* Player Name */}
      <h2 className="text-lg font-bold text-center text-purple-900">{name}</h2>
      <p className="text-center text-sm text-white">{university}</p>
    </div>
  );
};

export default PlayerCard;
