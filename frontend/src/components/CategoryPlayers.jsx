import React, { useState, useEffect } from "react";
import axios from "axios";
import playerImage from "../assets/Player1.jpg"; // Adjust path if needed
import { toast } from "react-toastify";

const CategoryPlayers = ({ userId }) => {
  const [teamCount, setTeamCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const maxPlayers = 11;

  // Hardcoded Players
  const [players, setPlayers] = useState(
    Array(6).fill(null).map((_, index) => ({
      _id: `manual-player-id-${index}`,
      name: `John Doe ${index + 1}`,
      university: "XYZ University",
      budget: 5000 + index * 1000,
      picture: playerImage,
      state: "Add", // Initial state for each player is "Add"
    }))
  );

  const handleButtonClick = (playerId) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player._id === playerId
          ? { ...player, state: player.state === "Add" ? "Remove" : "Add" }
          : player
      )
    );
  };

  // Fetch players and user's team count
  useEffect(() => {
    setLoading(true);

    axios.get(`/api/player/category-player`)
      .then((res) => {
        const fetchedPlayers = Array.isArray(res.data) ? res.data : [];
        setPlayers((prevPlayers) => [...prevPlayers, ...fetchedPlayers]);
      })
      .catch(() => setPlayers(hardcodedPlayers));

    axios.get(`/api/team/get-team-players`)
      .then((res) => {
        setTeamCount(res.data.teamPlayers?.length || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  // Add Player to Team
  const addToTeam = (player) => {
    if (teamCount >= maxPlayers) return;

    axios.post(`/api/team/add-team-players`, { playerID: player._id })
      .then(() => {
        toast.success("Player added to your team!");
        setTeamCount((prev) => prev + 1); // Increase count
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error adding player");
      });
  };

  // Remove Player from Team
  const removeFromTeam = (player) => {
    axios.post(`/api/team/remove-team-players`, { playerID: player._id })
      .then(() => {
        toast.info("Player removed from your team");
        setTeamCount((prev) => Math.max(prev - 1, 0)); // Decrease count but not below 0
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error removing player");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={styles.headerContainer}>
        <h2>Available Players</h2>
        <div style={styles.counter}>
          {teamCount}/{maxPlayers}
        </div>
      </div>
      <div style={styles.cardsContainer}>
        {players.length > 0 ? (
          players.map((player) => (
            <div key={player._id} style={styles.card}>
              <img src={player.picture} alt={player.name} style={styles.picture} />
              <div style={styles.cardContent}>
                <h3>{player.name}</h3>
                <p><strong>University:</strong> {player.university}</p>
                <p><strong>Budget:</strong> ${player.budget}</p>
                <button
                  onClick={() => handleButtonClick(player._id)}
                  style={{
                    ...styles.addButton,
                    backgroundColor: player.state === "Add" ? "#4CAF50" : "#f44336", // Green for Add, Red for Remove
                    opacity: player.state === "Add" && teamCount >= maxPlayers ? 0.5 : 1, // Only apply opacity for Add button
                    pointerEvents: player.state === "Add" && teamCount >= maxPlayers ? "none" : "auto", // Only apply pointerEvents for Add button
                  }}
                >
                  {player.state} {/* Display "Add" or "Remove" based on the player's state */}
                </button>
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

const styles = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counter: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: "5px 10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: "20px",
  },
  card: {
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  picture: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  cardContent: {
    marginTop: "10px",
  },
  addButton: {
    padding: "8px 16px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%",
    fontWeight: "bold",
    transition: "opacity 0.3s ease",
  },
};

export default CategoryPlayers;
