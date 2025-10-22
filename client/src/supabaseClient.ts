import { createClient } from '@supabase/supabase-js';

declare const process: any;

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase client environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;