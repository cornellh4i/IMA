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
 *
 * TODO: If your DB uses snake_case, normalize to the app's field names here.
 */
export const mapRowToAlumni = (row: SupabaseAlumniRow): AlumniRecord => {
  // TODO: Map/normalize all fields as needed
  // Example assumes parity between stored names and app names
  throw new Error("Not implemented: mapRowToAlumni");
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
  // TODO: Implement
  throw new Error("Not implemented: getAllAlumniService");
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
  // TODO: Implement
  throw new Error("Not implemented: getAlumniByIdService");
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
  // TODO: Implement
  // Suggested outline:
  // let query = supabase.from(ALUMNI_TABLE).select("*");
  // Iterate keys in filters, skip alumniUrlFields, apply ilike/eq/in/gte/lte as appropriate
  // const { data, error } = await query;
  // if (error) throw new Error(error.message);
  // return (data ?? []).map(mapRowToAlumni);
  throw new Error("Not implemented: queryAlumniService");
};
