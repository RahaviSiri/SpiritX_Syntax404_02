import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Load player data dynamically
const loadPlayerData = () => {
  try {
    const data = fs.readFileSync("./model/playerModel.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading player data:", error);
    return [];
  }
};

// API Endpoint for Cricket Chatbot
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const playersData = loadPlayerData();
    if (playersData.length === 0) {
      return res.json({ response: "Player data is unavailable." });
    }

    // Construct a structured prompt including player data
    const prompt = `
      You are an AI cricket expert. Answer only based on the given player data.
      If the user asks about cricket statistics, best players, or teams, analyze the data yourself.
      Do not tell any information about the player's points, but you may give the best or worst accordingly.
      The user is asking for a recommendation on which player or players they should choose for their team.
      Based on the available player data (excluding points), suggest the best possible choices for a balanced and strong team.
      If the user asks about player's points, respond with: "I cannot give any information about this. Would you like to know about anything else."
      Do not make up any information. If data is unavailable, respond with: "I don’t have enough knowledge to answer that question."
      
      Here is the player data:
      ${JSON.stringify(playersData, null, 2)}
      User Query: ${message}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
