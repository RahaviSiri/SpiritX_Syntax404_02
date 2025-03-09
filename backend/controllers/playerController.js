import playerModel from "../models/playerModel.js";
import {v2 as cloudinary} from "cloudinary"

const addPlayer = async (req, res) => {
  try {
    const { 
      name, 
      university, 
      category, 
      totalRuns, 
      ballsFaced, 
      inningsPlayed, 
      wickets, 
      oversBowled, 
      runsConceded,
    } = req.body;
    
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const player = new playerModel({
      name,
      university,
      category,
      totalRuns,
      ballsFaced,
      inningsPlayed,
      wickets,
      oversBowled,
      runsConceded,
      image: imageUpload.secure_url
    });

    await player.save();
    res.status(201).json({ success: true, message: "Player added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPlayers = async (req, res) => {
  try {
    const players = await playerModel.find({});
    res.status(200).json({ success: true, players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;  
    const player = await playerModel.findById(id);  
    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }
    res.status(200).json({ success: true, player });  
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePlayer = async (req,res) => {
  try {
    const { id } = req.params; 
    const player = await playerModel.findByIdAndDelete(id);
    
    if (!player) {
      return res.status(404).json({ success: false, message: "Player not found" });
    }
    res.json({ success: true, message: "Player successfully deleted" });
  } catch (error) {
    console.error("Error deleting Player:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      university, 
      category, 
      totalRuns, 
      ballsFaced, 
      inningsPlayed, 
      wickets, 
      oversBowled, 
      runsConceded,
    } = req.body;
    let updateFields = { name, 
      university, 
      category, 
      totalRuns, 
      ballsFaced, 
      inningsPlayed, 
      wickets, 
      oversBowled, 
      runsConceded,
      };

    // If a new image is uploaded, update it
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateFields.image = imageUpload.secure_url;
    }

    const player = await playerModel.findByIdAndUpdate(id, updateFields, { new: true });

    if (!player) {
      return res.status(404).json({ success: false, message: "Player not found" });
    }

    return res.json({ success: true, message: "Player Updated Successfully", player });

  } catch (error) {
    console.error("Error in updates Player:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getPlayersByCategory = async (req, res) => {
  try {
    const { category } = req.params; 

    // Query the database to find players with the specified category
    const players = await playerModel.find({ category });

    if (!players || players.length === 0) {
      return res.status(404).json({ success: false, message: `No players found for category: ${category}` });
    }

    // Send back the players matching the category
    res.status(200).json({ success: true, players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addPlayer,getPlayers,getPlayerById, deletePlayer,updatePlayer,getPlayersByCategory };
