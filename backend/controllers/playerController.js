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

// Function to get players based on category
const getPlayersByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Get the category from the URL parameter

    // Query the database to find players with the specified category
    const players = await playerModel.find({ category });

    if (players.length === 0) {
      return res.status(404).json({ success: false, message: `No players found for category: ${category}` });
    }

    // Send back the players matching the category
    res.status(200).json({ success: true, players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addPlayer,getPlayers, getPlayersByCategory };