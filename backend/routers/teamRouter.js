import express from "express";

import { getTeamPlayers, addTeamPlayers, removeTeamPlayers } from "../controllers/teamController.js";

const teamRouter = express.Router();

teamRouter.get("/get-team-players", getTeamPlayers);
teamRouter.get("/add-team-players", addTeamPlayers);
teamRouter.get("/remove-team-players", removeTeamPlayers);

export default teamRouter;