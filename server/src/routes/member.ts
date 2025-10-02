import express from "express";
import { getAllMembers } from "../controllers/member";

const router = express.Router();

// GET /api/members - Get all members
// Documentation is handled in swagger/paths.ts
router.get("/", getAllMembers);

export default router;
