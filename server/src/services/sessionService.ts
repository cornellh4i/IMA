import {supabase} from "../supabase";
import { Session } from "@supabase/supabase-js";

/**
 * Get the current session
 * @returns The session object
 */
export const getSessionService = async (): Promise<Session | null> => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw error;
    }
    return data.session;
};