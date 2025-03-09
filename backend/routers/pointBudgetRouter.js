import express from "express";
import { calculatePointsAndBudget } from "../controllers/pointBudgetController.js";

const pointAndBudgetRouter = express.Router();

pointAndBudgetRouter.get("/get-player-points-and-budget/:id", calculatePointsAndBudget);

export default pointAndBudgetRouter;