import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    university: { type: String, required: true },
    category: { type: String, required: true },
    totalRuns: { type: Number, required: true },
    ballsFaced: { type: Number, required: true },
    inningsPlayed: { type: Number, required: true },
    oversBowled: { type: Number, required: true },  
    runsConceded: { type: Number, required: true },
    wickets: { type: Number, required: true },
});
  
const playerModel = mongoose.models.player || mongoose.model("player",playerSchema);

export default playerModel;

