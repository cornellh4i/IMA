import { Request, Response } from "express";
import { getAllMembersService } from "../services/memberServices";
import { supabase } from "../supabase";
import { MEMBERS_TABLE } from "../models/member";

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
 * Get a member by ID
 */
export const getMemberById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Member ID is required" });
      return;
    }

    const { data, error } = await supabase
      .from(MEMBERS_TABLE)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        res.status(404).json({ error: "Member not found" });
        return;
      }
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ error: "Failed to fetch member" });
  }
};
