import React, { useState, useEffect } from "react";
import axios from "axios";
import playerImage from "../assets/Player1.jpg"; // Adjust path if needed

const CategoryPlayers = ({ userId }) => {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const maxPlayers = 11;

  const hardcodedPlayers = Array(6).fill(null).map((_, index) => ({
    _id: `manual-player-id-${index}`,
    name: `John Doe ${index + 1}`,
    university: "XYZ University",
    budget: 5000 + index * 1000,
    picture: playerImage,
  }));

  useEffect(() => {
    setLoading(true);

    axios.get("/backend")
      .then((res) => {
        const fetchedPlayers = Array.isArray(res.data) ? res.data : [];
        setPlayers([...hardcodedPlayers, ...fetchedPlayers]);
      })
      .catch(() => setPlayers(hardcodedPlayers));

    axios.get(`/api/team/${userId}`)
      .then((res) => {
        setTeam([]); 
        // setTeam(res.data);
        setCounter(0);     //Add team.length
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  const addToTeam = (player) => {
    if (counter >= maxPlayers) return;
    setCounter(counter+1)
    axios.post(`/api/team/${userId}/add`, { playerId: player._id }).then(() => {
      setTeam((team) => [...team, player]);
    });
  };


  const removeFromTeam = (player) => {
    axios.post(`/api/team/${userId}/remove`, { playerId: player._id }).then(() => {
      setCounter(counter-1); // Ensure counter doesn't go below 0
      //setTeam((prevTeam) => prevTeam.filter((p) => p._id !== player._id));
    });
  };



  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={styles.headerContainer}>
        <h2>Available Players</h2>
        <div style={styles.counter}>
          {counter}/{maxPlayers}
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
                  onClick={() => 
                    team.some((p) => p._id === player._id) 
                      ? removeFromTeam(player) 
                      : addToTeam(player)
                  }
                  style={{
                    ...styles.addButton,
                    backgroundColor: team.some((p) => p._id === player._id) ? "#f44336" : "#4CAF50",
                    opacity: counter >= maxPlayers && !team.some((p) => p._id === player._id) ? 0.5 : 1,
                    pointerEvents: counter >= maxPlayers && !team.some((p) => p._id === player._id) ? "none" : "auto",
                  }}
                >
                  {team.some((p) => p._id === player._id) ? "Remove" : "Add"}
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