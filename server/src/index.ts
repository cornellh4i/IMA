import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database";
import userRoutes from "./routes/user";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

connectDB().then(() => {
  app.use(cors());
  app.use(express.json());

  app.use("/api/users", userRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
  });
});
