import express from "express";
import {
  addUser,
  getAllUsers,
  getUserByName,
  deleteAllUsers,
  deleteUserById,
  updateUserById,
} from "../controllers/user";

const router = express.Router();

router.post("/addMember", addUser);
router.get("/getAllMembers", getAllUsers);
router.get("/getMemberByName/:name", getUserByName);
router.delete("/deleteAll", deleteAllUsers);
router.delete("/deleteMember/:id", deleteUserById);
router.put("/updateMember/:id", updateUserById);

export default router;
