import express from "express";
import {
  getAllAlumni,
  getAlumniById,
  queryAlumni,
} from "../controllers/alumni";

const router = express.Router();


// GET /api/alumni - Get all alumni
router.get("/", getAllAlumni);

// GET /api/alumni/query - Query alumni by non-URL fields
// Must come before /:id route to avoid matching "query" as an ID
router.get("/query", queryAlumni);

// GET /api/alumni/:id - Get single alumni by ID
router.get("/:id", getAlumniById);

export default router;
