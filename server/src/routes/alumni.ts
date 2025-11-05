import express from "express";
import {
  getAllAlumni,
  getAlumniById,
  queryAlumni,
} from "../controllers/alumni";

const router = express.Router();

// TODO: Register this router in app.ts
// Example: in server/src/app.ts
//   import alumniRoutes from "./routes/alumni";
//   app.use("/api/alumni", alumniRoutes);

// GET /api/alumni - Get all alumni
router.get("/", getAllAlumni);

// GET /api/alumni/:id - Get single alumni by ID
router.get("/:id", getAlumniById);

// GET /api/alumni/query - Query alumni by non-URL fields
router.get("/query", queryAlumni);

export default router;
