import express from "express";
import upload from "../middleware/multer.js";

import { addPlayer, getPlayerById, getPlayers, deletePlayer, updatePlayer, getPlayersByCategory } from "../controllers/playerController.js";

const playerRouter = express.Router();

playerRouter.post("/add",upload.single("image"),addPlayer);
playerRouter.put("/update/:id",upload.single("image"),updatePlayer);
playerRouter.post("/delete/:id",deletePlayer);
playerRouter.get("/get-players",getPlayers);
playerRouter.get("/getPlayerbyId/:id",getPlayerById);
playerRouter.get("/category-player/:category",getPlayersByCategory);

export default playerRouter;