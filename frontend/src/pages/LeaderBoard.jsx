import { UserContext } from "@/context/UserContext";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const LeaderBoard = () => {
  const { backendURL, uToken } = useContext(UserContext);  
  const [teams, setTeams] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  // Fetch all teams
  const fetchTeams = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/team/get-teams`);
      if (data.success) {
        setTeams(data.teams);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch user data
  const fetchUser = async (userId) => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/get-user-byId/${userId}`);
      if (data.success) {
        return data.user;  
      } else {
        toast.error("Error in fetching user");
        return null;
      }
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  // Fetch player points for a team
  const fetchPoints = async (playerId) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/budget/get-player-points-and-budget/${playerId}`
      );
      return data.success ? data.playerPoints : 0;
    } catch (error) {
      return 0;
    }
  };

  // Calculate total points for a team's players
  const fetchAllPoints = async (team) => {
    let total = 0;

    await Promise.all(
      team.players.map(async (player) => {
        const points = await fetchPoints(player.playerId);
        total += points;
      })
    );

    return total;
  };

  // Update leaderboard with total points for each team
  const updateLeaderboard = async () => {
    const leaderboardData = [];

    for (let team of teams) {
      if (team.players.length === 11) {
        const totalPoints = await fetchAllPoints(team);
        const user = await fetchUser(team.userId);  
        if (user) {
          leaderboardData.push({
            user: user.userName,
            totalPoints,
            userId: team.userId, 
          });
        }
      }
    }

    leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);  
    setLeaderboard(leaderboardData);
  };

  // Fetch logged-in user details
  const fetchLoggedUser = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/get-user-data`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      });
      if (data.success) {
        setLoggedUser(data.user);  
      }
    } catch (error) {
      toast.error("Error fetching logged-in user.");
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchLoggedUser();  
  }, []);

  useEffect(() => {
    if (teams.length > 0) {
      updateLeaderboard();
    }
  }, [teams]);

  return (
    <div className="min-h-screen ">
    <div className="w-full md:max-w-3xl mx-auto my-8 p-6 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">🏆 Fantasy League Leaderboard</h2>
      <ul className="space-y-4">
        {leaderboard.map((team, index) => (
          <li
            key={index}
            className={`p-3 rounded-lg flex justify-between items-center ${loggedUser && loggedUser.userName === team.user ? 'bg-purple-200 text-purple-700' : 'text-white'}`}
          >
            <span className="font-semibold">{index + 1}. {team.user}</span>
            <span className="font-semibold">{team.totalPoints} pts</span>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default LeaderBoard;
