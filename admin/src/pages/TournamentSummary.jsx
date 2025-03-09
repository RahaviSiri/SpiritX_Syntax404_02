import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TournamentSummary = () => {
  const [players, setPlayers] = useState([]);
  const [tournamentData, setTournamentData] = useState({
    overallRuns: 0,
    overallWickets: 0,
    highestRunScorer: "",
    highestWicketTaker: "",
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Runs',
        data: [],
        backgroundColor: '#452699', 
      },
      {
        label: 'Wickets',
        data: [],
        backgroundColor: '#8e44ad', 
      },
    ],
  });

  const backendURL = "http://localhost:4500"; 

  const getPlayers = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/player/get-players`);
      console.log("Players Data:", data); 
      if (data.success) {
        setPlayers(data.players);
        calculateTournamentStats(data.players); // Calculate stats directly from players
        prepareChartData(data.players); // Prepare chart data
      } else {
        toast.error("Error getting players");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Calculate the tournament statistics
  const calculateTournamentStats = (playersData) => {
    let overallRuns = 0;
    let overallWickets = 0;
    let highestRunScorer = "";
    let highestWicketTaker = "";
    let maxRuns = 0;
    let maxWickets = 0;

    playersData.forEach((player) => {
      overallRuns += player.totalRuns;
      overallWickets += player.wickets;

      // Find the highest run scorer
      if (player.totalRuns > maxRuns) {
        maxRuns = player.totalRuns;
        highestRunScorer = player.name;
      }

      // Find the highest wicket taker
      if (player.wickets > maxWickets) {
        maxWickets = player.wickets;
        highestWicketTaker = player.name;
      }
    });

    // Update the tournament data
    setTournamentData({
      overallRuns,
      overallWickets,
      highestRunScorer,
      highestWicketTaker,
    });
  };

  // Prepare chart data
  const prepareChartData = (playersData) => {
    const playerNames = playersData.map(player => player.name);
    const runs = playersData.map(player => player.totalRuns);
    const wickets = playersData.map(player => player.wickets);

    setChartData({
      labels: playerNames,
      datasets: [
        {
          label: 'Runs',
          data: runs,
          backgroundColor: '#452699',
        },
        {
          label: 'Wickets',
          data: wickets,
          backgroundColor: '#8e44ad',
        },
      ],
    });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className="w-full px-4 pt-8">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center p-6 md:p-10 space-y-6 rounded-xl ">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          🏆 Tournament Summary
        </h2>

        {/* Tournament Data Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-[#9966CC] to-[#800080] text-white text-sm sm:text-lg">
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Tournament</th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Overall Runs</th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Overall Wickets</th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Highest Run Scorer</th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Highest Wicket Taker</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm sm:text-md">
              <tr className="hover:bg-gray-100 even:bg-gray-200 odd:bg-white transition-all duration-300">
                <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 font-medium">Tournament 1</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300">{tournamentData.overallRuns}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300">{tournamentData.overallWickets}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300">{tournamentData.highestRunScorer}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300">{tournamentData.highestWicketTaker}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bar Chart Display */}
        <div className="w-full mt-8">
          <Bar data={chartData} options={{
            responsive: true,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          }} />
        </div>
      </div>
    </div>
  );
};

export default TournamentSummary;
