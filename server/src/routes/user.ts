import express from "express";
import {
  addUser,
  getAllUsers,
  getUserByName,
  deleteUserById,
  updateUserById,
} from "../controllers/user";

const router = express.Router();

router.post("/addUser", addUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserByName/:name", getUserByName);
router.delete("/deleteUser/:id", deleteUserById);
router.put("/updateUser/:id", updateUserById);

export default router;
