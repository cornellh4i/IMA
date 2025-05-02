import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
const cookieParser = require("cookie-parser");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// Add new route models here

export default app;
