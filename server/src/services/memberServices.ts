import { supabase } from "../supabase";
import {
  MEMBERS_TABLE,
  MemberRecord,
  MemberRole,
  SupabaseMemberRow,
} from "../models/member";

export interface MemberListFilters {
  roles?: MemberRole[];
  teams?: string[];
  joinedBefore?: string;
  joinedAfter?: string;
  search?: string;
  limit: number;
  offset: number;
}

export interface MemberListResult {
  members: MemberRecord[];
  count: number;
}

const escapeLikePattern = (value: string): string =>
  value.replace(/[%_]/g, (match) => `\\${match}`);

const mapRowToMember = (row: SupabaseMemberRow): MemberRecord => ({
  id: row.id,
  name: row.name,
  profilePicture: row.profile_picture ?? undefined,
  role: row.role,
  team: row.team,
  dateJoined: row.date_joined ?? "",
  email: row.email,
  linkedIn: row.linkedIn ?? undefined,
  bio: row.bio ?? undefined,
  created_at: row.created_at,
});

export const listMembers = async (
  filters: MemberListFilters
): Promise<MemberListResult> => {
  const { limit, offset } = filters;

  let query = supabase
    .from(MEMBERS_TABLE)
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1)
    .order("date_joined", { ascending: false });

  if (filters.roles && filters.roles.length > 0) {
    query = query.in("role", filters.roles);
  }

  if (filters.teams && filters.teams.length > 0) {
    query = query.in("team", filters.teams);
  }

  if (filters.joinedBefore) {
    query = query.lte("date_joined", filters.joinedBefore);
  }

  if (filters.joinedAfter) {
    query = query.gte("date_joined", filters.joinedAfter);
  }

  if (filters.search) {
    const pattern = `%${escapeLikePattern(filters.search)}%`;
    query = query.or(
      `name.ilike.${pattern},email.ilike.${pattern},bio.ilike.${pattern}`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const members = (data ?? []).map(mapRowToMember);

  return {
    members,
    count: count ?? 0,
  };
};

/**
 * Get all members without pagination or filters
 * @returns Promise with all members
 */
export const getAllMembersService = async (): Promise<MemberRecord[]> => {
  const { data, error } = await supabase
    .from(MEMBERS_TABLE)
    .select("*")
    .order("date_joined", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapRowToMember);
};
