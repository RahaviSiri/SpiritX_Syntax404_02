import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.get("/", (req, res) => {
    res.json("API working");
});

app.listen(PORT, () => {
    console.log(`Backend is working at port ${PORT}`);
});