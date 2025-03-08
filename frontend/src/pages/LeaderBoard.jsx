import React, { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const loggedInUser = "spiritx_2025"; // Replace with actual logged-in user from authentication

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Uncomment this if you have an actual API endpoint
        // const response = await fetch("https://your-api.com/leaderboard"); 
        // const data = await response.json();

        // Use hardcoded data for now
        const data = [
          { username: "player1", totalPoints: 5800 },
          { username: "spiritx_2025", totalPoints: 8000 },
          { username: "player2", totalPoints: 5400 }
        ];
        
        // Sort users by total points (highest to lowest)
        setUsers(data.sort((a, b) => b.totalPoints - a.totalPoints));
        console.log("Users after fetching:", data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
    
    // Auto-refresh leaderboard every 10 seconds
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  console.log("Users before rendering:", users);

  return (
    <div className="w-full sm:max-w-2xl mx-auto my-8 p-6 bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">🏆 Fantasy League Leaderboard</h2>
      <ul className="space-y-3">
        {users.map((user, index) => (
          <li
            key={user.username}
            className={`p-3 rounded-lg flex justify-between items-center ${
              user.username === loggedInUser
                ? "bg-purple-600 text-black font-bold"
                : "bg-gray-700"
            }`}
          >
            <span className={user.username === loggedInUser ? "font-bold" : ""}>
              {index + 1}. {user.username}
            </span>
            <span className={user.username === loggedInUser ? "font-bold" : ""}>
              {user.totalPoints} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;

