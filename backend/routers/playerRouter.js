import express from "express";
import upload from "../middleware/multer.js";
import { addPlayer, getPlayers, getPlayersByCategory } from "../controllers/playerController.js";

const playerRouter = express.Router();

playerRouter.post("/add",upload.single("image"),addPlayer);
playerRouter.get("/get-players",getPlayers);
playerRouter.get("/category-player",getPlayersByCategory);

export default playerRouter;