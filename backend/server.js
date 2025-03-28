import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import playerRouter from "./routers/playerRouter.js";
import adminRouter from "./routers/adminRouter.js";
import userRouter from "./routers/userRouter.js";
import teamRouter from "./routers/teamRouter.js";
import pointAndBudgetRouter from "./routers/pointBudgetRouter.js";
import router from "./routers/geminiAPI.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4500;

connectDB();
connectCloudinary();

app.get("/", (req, res) => {
    res.json("API working");
});
app.use("/api/player", playerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/team", teamRouter);
app.use("/api/budget", pointAndBudgetRouter);
app.use("/api",router);

app.listen(PORT, () => {
    console.log(`Backend is working at port ${PORT}`);
});