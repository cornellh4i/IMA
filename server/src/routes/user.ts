import express from "express";
import {
  addUser,
  getAllUsers,
  getUserByName,
  deleteUserById,
  updateUserById,
} from "../controllers/user";

const router = express.Router();

router.post("/addMember", addUser);
router.get("/getAllMembers", getAllUsers);
router.get("/getMemberByName/:name", getUserByName);
router.delete("/deleteMember/:id", deleteUserById);
router.put("/updateMember/:id", updateUserById);

export default router;
