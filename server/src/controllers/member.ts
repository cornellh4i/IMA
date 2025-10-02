import { Request, Response } from "express";
import { getAllMembersService } from "../services/memberServices";

/**
 * Get all members
 */
export const getAllMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await getAllMembersService();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
};
