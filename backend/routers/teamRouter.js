import express from "express";
import { getTeamPlayers, addTeamPlayers, removeTeamPlayers,checkPlayerInTeam, getTeams } from "../controllers/teamController.js";
import authUser from "../middleware/authUser.js";

const teamRouter = express.Router();

teamRouter.get("/get-team-players", authUser,getTeamPlayers);
teamRouter.post("/add-team-players", authUser,addTeamPlayers);
teamRouter.post("/remove-team-players", authUser,removeTeamPlayers);
teamRouter.post("/check-player", authUser,checkPlayerInTeam);
teamRouter.get("/get-teams",getTeams);


export default teamRouter;