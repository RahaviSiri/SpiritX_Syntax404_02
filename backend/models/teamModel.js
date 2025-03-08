import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    
    user: { type: String, required: true }, // Store user ID or name
    budget: { type: Number, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "player" }] // Reference to players
});

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default teamModel;
