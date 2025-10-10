import { Request, Response } from "express";
import { getAllMembersService, updateMemberService } from "../services/memberServices";
import { MemberUpdate } from "../models/member";

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

/**
 * Update a member by their unique ID
 */
export const updateMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates: MemberUpdate = req.body;

    if (!id) {
      res.status(400).json({ error: "Member ID is required" });
      return;
    }

    const updatedMember = await updateMemberService(id, updates);
    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    if (error instanceof Error && error.message === "Member not found") {
      res.status(404).json({ error: "Member not found" });
    } else {
      res.status(500).json({ error: "Failed to update member" });
    }
  }
};
