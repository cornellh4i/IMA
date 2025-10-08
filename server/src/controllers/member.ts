import { Request, Response } from "express";
import { getAllMembersService } from "../services/memberServices";
import { MEMBERS_TABLE, MemberFields } from "../models/member";
import { supabase } from "../supabase";
import { mapMemberToRow } from "../services/memberServices";

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
 * Add a new member
 * @param member - The member data specified in the Swagger schema
 * @param req - The request object
 * @param res - The response object
 */
export const addMember = async (req: Request, res: Response): Promise<void> => {
  const member : MemberFields = req.body;

  // Map the member to the Supabase row format (excluding the id and created_at fields)
  const memberRow = mapMemberToRow(member);
  
  // Add the member to the database
  const { data, error } = await supabase
  .from(MEMBERS_TABLE)
  .insert(memberRow)
  .select() // Return the inserted member
  .single(); // Supabase returns an array of objects, so we use .single() to return the first object
  
  // If error, return 400 (supabase does not throw an error, just returns — no need for try catch)
  if (error) {
    console.error("Error adding member:", error);
    res.status(400).json({ error: "Failed to add member" + error.message });
    return;
  }

  res.status(201).json({message: 'Inserted successfully', member: data});
};