import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "player" }] // Reference to players
});

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default teamModel;