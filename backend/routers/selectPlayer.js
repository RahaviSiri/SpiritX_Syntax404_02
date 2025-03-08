import express from "express";
import upload from "../middleware/multer.js";
import { addPlayer, getPlayers } from "../controllers/playerController.js";

const categoryRouter = express.Router();

playerRouter.post("/add",upload.single("image"),addPlayer);
playerRouter.get("/get-players",getPlayers);

export default categoryRouter;