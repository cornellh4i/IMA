import { createClient } from '@supabase/supabase-js';

// Type declaration for process.env in browser context
declare const process: {
  env: {
    REACT_APP_SUPABASE_URL?: string;
    REACT_APP_SUPABASE_ANON_KEY?: string;
  };
};

// Environment variables for Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client singleton
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Typed helper functions for common operations
export const supabaseHelpers = {
  // Get all members
  async getMembers() {
    const { data, error } = await supabase
      .from('Members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Failed to fetch members: ${error.message}`);
    }
    
    return data || [];
  },

  // Search members by name
  async searchMembers(query: string) {
    const { data, error } = await supabase
      .from('Members')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Failed to search members: ${error.message}`);
    }
    
    return data || [];
  },

  // Filter members by category
  async filterMembers(filters: Record<string, string[]>) {
    let query = supabase.from('Members').select('*');
    
    // Apply filters
    Object.entries(filters).forEach(([category, values]) => {
      if (values.length > 0) {
        query = query.in(category, values);
      }
    });
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Failed to filter members: ${error.message}`);
    }
    
    return data || [];
  },

  // Add new member
  async addMember(memberData: any) {
    const { data, error } = await supabase
      .from('Members')
      .insert([memberData])
      .select();
    
    if (error) {
      throw new Error(`Failed to add member: ${error.message}`);
    }
    
    return data?.[0];
  },

  // Update member
  async updateMember(id: string, updates: any) {
    const { data, error } = await supabase
      .from('Members')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) {
      throw new Error(`Failed to update member: ${error.message}`);
    }
    
    return data?.[0];
  },

  // Delete member
  async deleteMember(id: string) {
    const { error } = await supabase
      .from('Members')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Failed to delete member: ${error.message}`);
    }
  },

  // Get saved members
  /**
   * Get the members that the member has saved
   * 
   * @param id - The member_id of the user to get the saved members for
   * @returns An array of members that the user has saved
   */
  async getSavedMembers(id: string) {
    // Fetch all saved_ids where the member_id is the specific member
    const { data, error } = await supabase
      .from('saved_profiles')
      .select('saved_id')
      .eq('member_id', id);
  
    if (error) {
      throw new Error(`Failed to fetch saved member ids: ${error.message}`);
    }
  
    // Extract the member_ids (saved_ids) from the rows
    const ids = (data ?? []).map(r => r.saved_id);
    if (ids.length === 0) return [];
  
    const { data: members, error: memErr } = await supabase
      .from('Members')
      .select('*')
      .in('id', ids)
      .order('created_at', { ascending: false });
  
    if (memErr) {
      throw new Error(`Failed to fetch member profiles: ${memErr.message}`);
    }
  
    return members ?? [];
  },
};
