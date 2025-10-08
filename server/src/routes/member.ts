import express from "express";
import { getAllMembers, updateMember } from "../controllers/member";

const router = express.Router();

// GET /api/members - Get all members
// Documentation is handled in swagger/paths.ts
router.get("/", getAllMembers);

// POST /api/members/:id - Update a member by ID
// Documentation is handled in swagger/paths.ts
router.post("/:id", updateMember);

export default router;
