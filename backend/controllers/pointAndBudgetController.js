import playerModel from "../models/playerModel.js";

// Controller to calculate player stats, points, and budget
const calculatePointsAndBudget = async (req, res) => {
    try {
        const player = await playerModel.findById(req.body);
        if (!player) return res.status(404).json({ message: "Player not found" });

        const playerStats = {
            battingStrikeRate: player.ballsFaced > 0 ? (player.totalRuns / player.ballsFaced) * 100 : "Not Available",
            battingAverage: player.inningsPlayed > 0 ? player.totalRuns / player.inningsPlayed : "Not Available",
            bowlingStrikeRate: player.wickets > 0 ? player.oversBowled / player.wickets : "Not Available",
            economyRate: player.oversBowled > 0 ? (player.runsConceded / player.oversBowled) * 6 : "Not Available"
        };

        const safeBattingStrikeRate = isNaN(playerStats.battingStrikeRate) ? 0 : playerStats.battingStrikeRate;
        const safeBattingAverage = isNaN(playerStats.battingAverage) ? 0 : playerStats.battingAverage;
        const safeBowlingStrikeRate = isNaN(playerStats.bowlingStrikeRate) ? 0 : playerStats.bowlingStrikeRate;
        const safeEconomyRate = isNaN(playerStats.economyRate) ? 0 : playerStats.economyRate;

        const playerPoints = (
            (safeBattingStrikeRate / 5 + safeBattingAverage * 0.8) +
            (safeBowlingStrikeRate > 0 ? 500 / safeBowlingStrikeRate : 0) +
            (safeEconomyRate > 0 ? 140 / safeEconomyRate : 0)
        );

        const playerBudget = Math.round(((9 * playerPoints + 100) * 1000) / 50000) * 50000;

        res.status(200).json({ playerStats, playerPoints, playerBudget });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { calculatePointsAndBudget };
