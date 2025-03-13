import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

// Add new route models here

export default app;
