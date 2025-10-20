import express from "express";
import { getSession } from "../controllers/userSession";
const router = express.Router();

router.get('/auth/session', getSession);

export default router;