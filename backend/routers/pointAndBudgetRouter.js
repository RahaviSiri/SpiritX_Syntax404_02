import express from "express";
import { calculatePointsAndBudget } from "../controllers/pointAndBudgetController.js";

const pointAndBudgetRouter = express.Router();

pointAndBudgetRouter.get("/get-player-points-and-budget", calculatePointsAndBudget);

export default pointAndBudgetRouter;