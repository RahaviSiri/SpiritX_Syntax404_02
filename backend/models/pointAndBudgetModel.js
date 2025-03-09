import mongoose from "mongoose";

// Schema for player points and budget
const pointAndBudgetSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "player", required: true },
  battingStrikeRate: { type: String, default: "Not Available" },
  bowlingStrikeRate: { type: String, default: "Not Available" },
  battingAverage: { type: String, default: "Not Available" },
  economyRate: { type: String, default: "Not Available" },
  playerPoints: { type: Number, default: 0 },
  budget: { type: Number, default: 0 }
});


const pointAndBudgetModel = mongoose.models.pointAndBudget || mongoose.model("pointAndBudget", pointAndBudgetSchema);

export default pointAndBudgetModel;