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

  /**
   * Insert a new alumni record into the Alumni table
   * 
   * @param alumniData - The data to insert into the Alumni table
   * @returns The inserted alumni record
   */
  async insertAlumni(alumniData: {
    full_name: string | null;
    emails: string[] | null;
    phone: string | null;
    linkedin_url: string | null;
    instagram_url: string | null;
    graduation_year: number | null;
    major: string | null;
  }) {
    if (!alumniData.full_name || !alumniData.emails || !alumniData.graduation_year || !alumniData.major) {
      throw new Error('Missing required fields');
    }

    if (!Array.isArray(alumniData.emails)) {
      throw new Error('Emails must be an array');
    }

    if (alumniData.emails.length === 0) {
      throw new Error('Emails must be an array');
    }

    if (!alumniData.graduation_year) {
      throw new Error('Graduation year is required');
    }

    if (!alumniData.major) {
      throw new Error('Major is required');
    }

    const { data, error } = await supabase
      .from('Alumni')
      .insert({
        full_name: alumniData.full_name,
        emails: alumniData.emails,
        phone: alumniData.phone,
        linkedin_url: alumniData.linkedin_url,
        instagram_url: alumniData.instagram_url,
        graduation_year: alumniData.graduation_year,
        major: alumniData.major,
      })
      .select();
    
    if (error) {
      throw new Error(`Failed to insert alumni: ${error.message}`);
    } 

    return data?.[0];
  },

  /**
   * Insert new job experience records into the Job_Experiences table
   * 
   * @param alumniId - The id of the alumni record to insert the job experience for
   * @param jobExperienceData - The data to insert into the Job_Experiences table
   * @returns An array of inserted job experience records
   */
  async insertJobExperience(alumniId: string, jobExperienceData: {
    title: string;
    employmmentType: string | null;
    company: string;
    location: string | null;
    startMonth: string | null;
    startYear: number | null;
    endMonth: string | null;
    endYear: number | null;
    description: string | null;
  }[]) {
    const data: any[] = [];

    jobExperienceData.forEach(async (job: {
      title: string;
      employmmentType: string | null;
      company: string;
      location: string | null;
      startMonth: string | null;
      startYear: number | null;
      endMonth: string | null;
      endYear: number | null;
      description: string | null;
    }) => {
      const { data, error } = await supabase
      .from('Job_Experiences')
      .insert({
        alumni_id: alumniId,
        title: job.title,
        employmmentType: job.employmmentType,
        company: job.company,
        location: job.location,
        startMonth: job.startMonth,
        startYear: job.startYear,
        endMonth: job.endMonth,
        endYear: job.endYear,
        description: job.description,
      })
      .select();

      if (error) {
        throw new Error(`Failed to insert job experience: ${error.message}`);
      }

      data.push(data?.[0]);
    });

    return data ?? [];
  },

  /**
   * Insert a new hack involvement record into the Hack_Involvements table
   * 
   * @param hackInvolvementData - The data to insert into the Hack_Involvements table
   * @returns The inserted hack involvement record
   */
  async insertHackInvolvement(alumniId: string, hackInvolvementData: {
    selectedRoles: string[];
    selectedProjects: string[];
    startSemester: string;
    endSemester: string;
    description: string;
  }[]) {
    const data: any[] = [];

    hackInvolvementData.forEach(async (hack: {
      selectedRoles: string[];
      selectedProjects: string[];
      startSemester: string;
      endSemester: string;
      description: string;
    }) => {
      const { data, error } = await supabase
      .from('Hack_Involvements')
      .insert({
        alumni_id: alumniId,
        selectedRoles: hack.selectedRoles,
        selectedProjects: hack.selectedProjects,
        startSemester: hack.startSemester,
        endSemester: hack.endSemester,
        description: hack.description,
      })
      .select();

      if (error) {
        throw new Error(`Failed to insert hack involvement: ${error.message}`);
      }

      data.push(data?.[0]);
    });

    return data ?? [];
  },
};
