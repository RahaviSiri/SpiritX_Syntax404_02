import React, { useState, useEffect } from "react";
import axios from "axios";

const INITIAL_BUDGET = 9000000;

const Budget = ({ userId }) => {
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [team, setTeam] = useState([
    { "_id": "player1", "name": "John Doe", "budget": 1500000 },
    { "_id": "player2", "name": "Jane Smith", "budget": 1200000 },
    { "_id": "player3", "name": "Alice Brown", "budget": 1000000 }
  ]);

  useEffect(() => {
    axios.get(`/api/team/${userId}`)
      .then((res) => {
        // If API data exists, use it; otherwise, fall back to the hardcoded team
        const teamData = team;
        // const teamData = res.data.length > 0 ? res.data : [];
        setTeam(teamData);

        // Calculate the total spent budget
        const totalSpent = teamData.reduce((sum, player) => sum + player.budget, 0);
        setBudget(INITIAL_BUDGET - totalSpent);
      })
      .catch((error) => {
        console.error(error);
        // If API fails, retain hardcoded data and use it
        const totalSpent = team.reduce((sum, player) => sum + player.budget, 0);
        setBudget(INITIAL_BUDGET - totalSpent);
      });
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2>Budget Tracker</h2>
      <div style={styles.budgetInfo}>
        <p><strong>Total Budget:</strong> Rs. {INITIAL_BUDGET.toLocaleString()}</p>
        <p><strong>Remaining Budget:</strong> Rs. {budget.toLocaleString()}</p>
      </div>

      <h3>Your Team</h3>
      {team.length > 0 ? (
        <ul style={styles.teamList}>
          {team.map((player) => (
            <li key={player._id} style={styles.playerItem}>
              <span>{player.name} - Rs. {player.budget.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No players selected.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center"
  },
  budgetInfo: {
    marginBottom: "20px"
  },
  teamList: {
    listStyle: "none",
    padding: 0
  },
  playerItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd"
  }
};

export default Budget;
