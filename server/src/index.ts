import app from "./app";
import { connectDB } from "./database";


const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
  });
});
