import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import app from "./app";
import { initializeDatabase } from "./database";

const PORT = process.env.PORT || 8000;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to initialize database:", error);
  process.exit(1);
});
