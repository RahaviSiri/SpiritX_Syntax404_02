import express from "express";
import { getTeamPlayers, addTeamPlayers, removeTeamPlayers,checkPlayerInTeam } from "../controllers/teamController.js";
import authUser from "../middleware/authUser.js";

const teamRouter = express.Router();

teamRouter.get("/get-team-players", authUser,getTeamPlayers);
teamRouter.post("/add-team-players", authUser,addTeamPlayers);
teamRouter.post("/remove-team-players", authUser,removeTeamPlayers);
teamRouter.post("/check-player", authUser,checkPlayerInTeam);



export default teamRouter;