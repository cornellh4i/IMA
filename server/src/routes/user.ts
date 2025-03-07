import express from "express";
import {
  addUser,
  getAllUsers,
  getUserByName,
  deleteAllUsers,
} from "../controllers/user";

const router = express.Router();

router.post("/addMember", addUser);
router.get("/getAllMembers", getAllUsers);
router.get("/getMemberByName/:name", getUserByName);
router.delete("/deleteAll", deleteAllUsers);

// TODO Pair 1: Implement DELETE /deleteMemberByName/:name
// TODO Pair 2: Implement PUT /updateMember/:name

export default router;
