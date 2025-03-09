import playerModel from "../models/playerModel.js";
import teamModel from "../models/teamModel.js";

const addTeamPlayers = async (req, res) => {
  try {
    const userId = req.body.userId;  
    console.log(userId)
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Player ID is required" });
    }

    // Find the player details
    const player = await playerModel.findById(id);
    if (!player) {
      return res.status(404).json({ success: false, message: "Player not found" });
    }

    // Prepare player object for storing inside team
    const playerData = {
      playerId: player._id,
      name: player.name,
      budget: player.budget,
      university: player.university
    };

    //  Check whether player is already included inside team or not
    let teamPlayers = await teamModel.findOne({ userId });
    console.log(teamPlayers);
    if(teamPlayers !== null){
      const playerExists = teamPlayers.players.some(p => p.playerId.toString() === id.toString());
      if (playerExists) {
        return res.status(400).json({ success: false, message: "Player already in team" });
      }
    }

    // Add player to the team (avoiding duplicates)
    const team = await teamModel.findOneAndUpdate(
      { userId },  // Ensure we're updating the correct team based on the userId
      {
        $addToSet: { players: playerData }, 
        // Add player to team (avoid duplicates)
        $setOnInsert: { userId }  
        // Set userId only on insert (if team doesn't exist)
      },
      { new: true, upsert: true } // Create a new team if it doesn't exist
    );

    res.status(200).json({ success: true, message: "Player added to team", team });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getTeamPlayers = async (req, res) => {
  try {
    const userId = req.body.userId; // Get userId from the request object

    // Find the team associated with the userId
    const team = await teamModel.findOne({ userId }).populate("players"); 
    // Populate the 'players' field with player details

    if (!team) {
      return res
        .status(404)
        .json({ success: false, message: "No team found for this user" });
    }

    // Extract player details (name, budget) from the populated players
    const teamPlayers = team.players.map((player) => ({
      name: player.name,
      budget: player.budget,
      _id: player._id,
    }));

    res.status(200).json({ success: true, teamPlayers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeTeamPlayers = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { playerID } = req.body;

    if (!playerID) {
      return res.status(400).json({ success: false, message: "Player ID is required" });
    }

    const team = await teamModel.findOneAndUpdate(
      { userId },
      { $pull: { players: { playerId: playerID } } }, // Remove by playerId
      { new: true }
    );

    res.status(200).json({ success: true, message: "Player removed from team", team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const checkPlayerInTeam = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { id } = req.body;

    let teamPlayers = await teamModel.findOne({ userId });
    
    // If the team exists and the player is found in the team
    if (teamPlayers) {
      const playerExists = teamPlayers.players.some(p => p.playerId.toString() === id.toString());
      if (playerExists) {
        return res.status(200).json({ success: true }); // Correct success response
      }
    }
    
    // return res.status(200).json({ success: false }); // Player is not in the team
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getTeamPlayers, addTeamPlayers, removeTeamPlayers,checkPlayerInTeam };
