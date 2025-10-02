import { supabase } from "./supabase";

export const initializeDatabase = async () => {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    throw new Error(`Supabase connection error: ${error.message}`);
  }

  console.log(
    `Supabase connection verified${
      Array.isArray(data) ? ` (${data.length} buckets accessible)` : ""
    }`
  );
};
