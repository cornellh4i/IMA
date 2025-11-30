import express from "express";
import {
  getAllAlumni,
  getAlumniById,
  queryAlumni,
  updateAlumniProfile,
} from "../controllers/alumni";

const router = express.Router();


// GET /api/alumni - Get all alumni
router.get("/", getAllAlumni);

// GET /api/alumni/query - Query alumni by non-URL fields
// Must come before /:id route to avoid matching "query" as an ID
router.get("/query", queryAlumni);

// POST /api/alumni/update-profile - Update profile picture URL
// Must come before /:id route to avoid matching "update-profile" as an ID
router.post("/update-profile", updateAlumniProfile);

// GET /api/alumni/:id - Get single alumni by ID
router.get("/:id", getAlumniById);

export default router;
