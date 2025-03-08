import express from "express";
import upload from "../middleware/multer.js";


const playerRouter = express.Router();

playerRouter.post("/add",upload.single("image"),addPlayer);
playerRouter.put("/update/:id",upload.single("image"),updateHotel);
playerRouter.post("/delete/:id",deletePlayer);
playerRouter.get("/get-players",getPlayers);
playerRouter.get("/getPlayerbyId/:id",getPlayerById);
playerRouter.get("/category-player",getPlayersByCategory);

export default playerRouter;