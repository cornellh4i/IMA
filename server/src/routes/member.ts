import express from "express";
import { getAllMembers, getMemberById } from "../controllers/member";

const router = express.Router();

// GET /api/members - Get all members
// Documentation is handled in swagger/paths.ts
router.get("/", getAllMembers);

// GET /api/members/:id - Get member by ID
// Documentation is handled in swagger/paths.ts
router.get("/:id", getMemberById);

export default router;
