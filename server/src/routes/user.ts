import express from "express";
import {
  addUser,
  getAllUsers,
  getUserByName,
  deleteUserById,
  updateUserById,
} from "../controllers/user";

import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/addUser",requireAuth, addUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserByName/:name", requireAuth, getUserByName);
router.delete("/deleteUser/:id", requireAuth, deleteUserById);
router.put("/updateUser/:id", requireAuth, updateUserById);

export default router;
