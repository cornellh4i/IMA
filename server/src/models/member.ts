export const MEMBERS_TABLE = "Members" as const;

export const memberRoles = [
  "COD",
  "TL/PM",
  "Engineering Chair",
  "Design Lead",
  "NME Instructor",
  "Member",
  "Newbie",
] as const;

export type MemberRole = (typeof memberRoles)[number];

export type MemberTeam = string;

export interface MemberFields {
  name: string;
  profilePicture?: string | null;
  role: MemberRole;
  team: MemberTeam;
  dateJoined: string;
  email: string;
  linkedIn?: string | null;
  bio?: string | null;
}

export interface MemberRecord extends MemberFields {
  id: string;
  created_at?: string;
}

// Add this interface for the raw Supabase row
export interface SupabaseMemberRow {
  id: string;
  name: string;
  profile_picture?: string | null;
  profilePicture?: string | null; // Alternative naming
  role: MemberRole;
  team: MemberTeam;
  date_joined?: string;
  dateJoined?: string; // Alternative naming
  email: string;
  linkedin?: string | null;
  linked_in?: string | null; // Alternative naming
  bio?: string | null;
  created_at?: string;
}

export type MemberInsert = MemberFields;

export type MemberUpdate = Partial<MemberFields>;
