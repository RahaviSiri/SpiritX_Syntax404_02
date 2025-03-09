import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    players: [
        {
            playerId: { type: mongoose.Schema.Types.ObjectId, ref: "player", required: true }, 
            name: { type: String, required: true },
            budget: { type: Number },
            university: { type: String , required: true}
        }
    ] 
});

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default teamModel;
