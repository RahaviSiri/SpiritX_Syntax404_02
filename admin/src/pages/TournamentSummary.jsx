import React from "react";

const TournamentSummary = () => {
  // Sample Tournament Data (Replace with actual tournament data)
  const tournamentData = [
    {
      tournamentName: "Tournament 1",
      overallRuns: 10500,
      overallWickets: 250,
      highestRunScorer: "Danushka Kumara - 1050 Runs",
      highestWicketTaker: "Lasith Malinga - 45 Wickets",
    },
    {
      tournamentName: "Tournament 1",
      overallRuns: 10500,
      overallWickets: 250,
      highestRunScorer: "Danushka Kumara - 1050 Runs",
      highestWicketTaker: "Lasith Malinga - 45 Wickets",
    },
    {
      tournamentName: "Tournament 1",
      overallRuns: 10500,
      overallWickets: 250,
      highestRunScorer: "Danushka Kumara - 1050 Runs",
      highestWicketTaker: "Lasith Malinga - 45 Wickets",
    },
  ];

  return (
    <div className="w-full px-4 pt-8">
      {/* Tournament Summary Container */}
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center p-6 md:p-10 space-y-6 rounded-xl ">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          🏆 Tournament Summary
        </h2>

        {/* Tournament Details Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-center border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-gradient-to-r from-[#9966CC] to-[#800080] text-white text-sm sm:text-lg">
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Tournament</th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Overall Runs</th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Overall Wickets</th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Highest Run Scorer</th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 border border-gray-300">Highest Wicket Taker</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-700 text-sm sm:text-md">
              {tournamentData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-100 even:bg-gray-200 odd:bg-white transition-all duration-300">
                  <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 font-medium">{data.tournamentName}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300">{data.overallRuns}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300">{data.overallWickets}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300">{data.highestRunScorer}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 border border-gray-300">{data.highestWicketTaker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TournamentSummary;
