import express from "express";
import { getAllMembers, addMember } from "../controllers/member";

const router = express.Router();

// GET /api/members - Get all members
// Documentation is handled in swagger/paths.ts
router.get("/", getAllMembers);

// POST /api/members - Add a new member
router.post("/", addMember);

export default router;
