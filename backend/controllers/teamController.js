import Team from "../models/teamModel.js";

const addTeamPlayers = async (req, res) => {
    try {
      const userId = req.userId; // Get userId from authentication middleware
      const playerID = req.body.playerID; // Expecting a single player ID
  
      if (!playerID) {
        return res.status(400).json({ success: false, message: "Player ID is required" });
      }
  
      // Find or create a team for the user
      let team = await Team.findOne({ userId });
  
      if (!team) {
        team = new Team({ userId, players: [] });
      }
  
      // Check if player already exists in the team
      if (team.players.includes(playerID)) {
        return res.status(400).json({ success: false, message: "Player already in the team" });
      }
  
      // Add the new player to the team
      team.players.push(playerID);
      await team.save();
  
      res.status(200).json({ success: true, message: "Player added to team", team });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  
  const getTeamPlayers = async (req, res) => {
    try {
      const userId = req.userId;  // Get userId from the request object
  
      // Find the team associated with the userId
      const team = await Team.findOne({ userId }).populate('players');  // Populate the 'players' field with player details
  
      if (!team) {
        return res.status(404).json({ success: false, message: "No team found for this user" });
      }
  
      // Extract player details (name, budget) from the populated players
      const teamPlayers = team.players.map(player => ({
        name: player.name,
        budget: player.budget,
        _id: player._id
      }));
  
      res.status(200).json({ success: true, teamPlayers });
  
    }catch (error){
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const removeTeamPlayers = async (req, res) => {
    try {
      const userId = req.userId; // Get userId from authentication middleware
      const playerID = req.body.playerID; // Expecting a single player ID
  
      if (!playerID) {
        return res.status(400).json({ success: false, message: "Player ID is required" });
      }
  
      // Find the user's team
      let team = await Team.findOne({ userId });
  
      if (!team) {
        return res.status(404).json({ success: false, message: "No team found for this user" });
      }
  
      // Check if the player exists in the team
      if (!team.players.includes(playerID)) {
        return res.status(400).json({ success: false, message: "Player not found in the team" });
      }
  
      // Remove the player from the team
      team.players = team.players.filter(id => id.toString() !== playerID);
  
      // Save the updated team to MongoDB
      await team.save();
  
      res.status(200).json({ success: true, message: "Player removed from team", team });
  
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  export { getTeamPlayers, addTeamPlayers, removeTeamPlayers };