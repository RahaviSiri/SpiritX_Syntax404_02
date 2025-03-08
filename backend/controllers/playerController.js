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
      runsConceded 
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
      image: imageUpload.secure_url,
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


export { addPlayer,getPlayers };