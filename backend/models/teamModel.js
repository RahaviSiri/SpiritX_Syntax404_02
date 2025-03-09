import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    players: [
        {
            playerId: { type: mongoose.Schema.Types.ObjectId, ref: "player", required: true }, // Reference to player
            name: { type: String, required: true },
            budget: { type: Number, required: true },
            university: { type: String }
        }
    ] 
});

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default teamModel;
