import express from "express"
import { getUserData, loginUser, registerUser } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/get-user-data",authUser,getUserData);

export default userRouter;