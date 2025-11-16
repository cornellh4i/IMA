import { supabase } from "../supabase";
import {
  ALUMNI_TABLE,
  AlumniRecord,
  SupabaseAlumniRow,
  alumniUrlFields,
} from "../models/alumni";

/**
 * Escape % and _ for use inside an ILIKE pattern.
 */
export const escapeLikePattern = (value: string): string =>
  value.replace(/[%_]/g, (match) => `\\${match}`);

/**
 * Map a raw Supabase row to an AlumniRecord used by the app.
 */
export const mapRowToAlumni = (row: SupabaseAlumniRow): AlumniRecord => {
  return {
    id: row.id,
    profile_url: row.profile_url ?? undefined,
    full_name: row.full_name ?? undefined,
    emails: row.emails ?? undefined,
    phone: row.phone ?? undefined,
    linkedin_url: row.linkedin_url ?? undefined,
    instagram_url: row.instagram_url ?? undefined,
    graduation_year: row.graduation_year ?? undefined,
    major: row.major ?? undefined,
    location: row.location ?? undefined,
    skills: row.skills ?? undefined,
    interests: row.interests ?? undefined,
    bio: row.bio ?? undefined,
    created_at: row.created_at,
    updated_at: row.updated_at ?? undefined,
  };
};

/**
 * GET /alumni — return all alumni.
 *
 * Implementation notes:
 * - Query: supabase.from(ALUMNI_TABLE).select("*")
 * - Apply a stable ordering (e.g., created_at desc or graduation_year desc)
 * - Map rows with mapRowToAlumni before returning
 * - Throw with Supabase error.message on error
 */
export const getAllAlumniService = async (): Promise<AlumniRecord[]> => {
  const { data, error } = await supabase
    .from(ALUMNI_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapRowToAlumni);
};

/**
 * GET /alumni/:id — return a single alumni by id.
 *
 * Implementation notes:
 * - Validate id as non-empty string before querying
 * - Query: .eq("id", id).single()
 * - If PostgREST not found error (e.g., code PGRST116), throw an explicit "Not found" error
 * - Map row with mapRowToAlumni before returning
 */
export const getAlumniByIdService = async (
  id: string
): Promise<AlumniRecord> => {
  if (!id || id.trim() === "") {
    throw new Error("Alumni ID is required");
  }

  const { data, error } = await supabase
    .from(ALUMNI_TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("Alumni not found");
    }
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Alumni not found");
  }

  return mapRowToAlumni(data);
};

/**
 * GET /alumni/query — flexible query across non-URL columns.
 *
 * Filter rules:
 * - Reject any keys present in alumniUrlFields
 * - For string columns: ILIKE contains (case-insensitive), escape %/_ using escapeLikePattern
 * - For number/date columns: default equality; support optional <field>_gte / <field>_lte for ranges
 * - For multi-value strings (e.g., major=CS,EE), split by comma and use .in()
 * - Ignore empty values (undefined, null, empty string)
 * - Return mapped rows; bubble up Supabase error.message on error
 */
export const queryAlumniService = async (
  filters: Record<string, unknown>
): Promise<AlumniRecord[]> => {
  let query = supabase.from(ALUMNI_TABLE).select("*");

  // String fields that support ILIKE search
  const stringFields = [
    "full_name",
    "phone",
    "location",
    "bio",
    // "graduation_year",
    "major",
  ];

  // Array fields that support .contains() or .in()
  const arrayFields = ["emails", "skills", "interests"];

  for (const [key, value] of Object.entries(filters)) {
    // Skip URL fields
    if (alumniUrlFields.includes(key)) {
      continue;
    }

    // Skip empty values
    if (value === undefined || value === null || value === "") {
      continue;
    }

    const valueStr = String(value);

    // Handle range queries (e.g., graduation_year_gte, graduation_year_lte)
    if (key.endsWith("_gte")) {
      const field = key.slice(0, -4);
      query = query.gte(field, valueStr);
      continue;
    }

    if (key.endsWith("_lte")) {
      const field = key.slice(0, -4);
      query = query.lte(field, valueStr);
      continue;
    }

    // Handle array fields - support comma-separated values for .in()
    if (arrayFields.includes(key)) {
      if (valueStr.includes(",")) {
        const values = valueStr.split(",").map((v) => v.trim()).filter((v) => v);
        if (values.length > 0) {
          query = query.contains(key, values);
        }
      } else {
        query = query.contains(key, [valueStr]);
      }
      continue;
    }

    // Handle string fields with ILIKE
    if (stringFields.includes(key)) {
      const pattern = `%${escapeLikePattern(valueStr)}%`;
      query = query.ilike(key, pattern);
      continue;
    }

    // Default: equality match
    query = query.eq(key, valueStr);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapRowToAlumni);
};
