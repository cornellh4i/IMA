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
    location: string | null;
    skills: string[] | null;
    interests: string[] | null;
    bio: string | null;
  }) {
    if (!alumniData.full_name || !alumniData.emails || !alumniData.graduation_year || !alumniData.major) {
      throw new Error('Missing required fields');
    }

    if (!Array.isArray(alumniData.emails)) {
      throw new Error('Emails must be an array');
    }

    if (alumniData.emails.length === 0) {
      throw new Error('Emails array cannot be empty');
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
        location: alumniData.location,
        skills: alumniData.skills,
        interests: alumniData.interests,
        bio: alumniData.bio,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(`Failed to insert alumni: ${error.message}`);
    } 

    return { data, error };
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
    employmentType: string | null;
    company: string;
    location: string | null;
    startMonth: string | null;
    startYear: number | null;
    endMonth: string | null;
    endYear: number | null;
    description: string | null;
  }[]) {
    const insertPromises = jobExperienceData.map(async (job) => {
      const { data, error } = await supabase
        .from('Alumni Job Experience')
        .insert({
          alumni_id: alumniId,
          title: job.title,
          employment_type: job.employmentType,
          company: job.company,
          location: job.location,
          start_month: job.startMonth,
          start_year: job.startYear,
          end_month: job.endMonth,
          end_year: job.endYear,
          description: job.description,
        })
        .select()
        .single();

      if (error) {
        console.error('Job experience insert error:', error);
        throw new Error(`Failed to insert job experience: ${error.message}`);
      }

      return data;
    });

    const results = await Promise.all(insertPromises);
    return results;
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
    const allInserts: Promise<any>[] = [];

    hackInvolvementData.forEach((hack) => {
      // Parse semester format "Fall '24" -> year: 2024, term: "Fall"
      const parseYear = (semester: string) => {
        const match = semester.match(/'(\d{2})$/);
        if (match) {
          const shortYear = parseInt(match[1]);
          return shortYear >= 0 && shortYear <= 30 ? 2000 + shortYear : 1900 + shortYear;
        }
        return null;
      };
      
      const parseTerm = (semester: string) => {
        return semester.toLowerCase().includes('fall') ? 'Fall' : 'Spring';
      };

      const startYear = parseYear(hack.startSemester);
      const startTerm = parseTerm(hack.startSemester);
      const endYear = parseYear(hack.endSemester);
      const endTerm = parseTerm(hack.endSemester);

      // Insert one row per role (since role is a single enum value, not array)
      hack.selectedRoles.forEach((role) => {
        const insertPromise = supabase
          .from('Alumni Hack Involvements')
          .insert({
            alumni_id: alumniId,
            role: role,
            projects: hack.selectedProjects,
            start_year: startYear,
            start_term: startTerm,
            end_year: endYear,
            end_term: endTerm,
            description: hack.description,
          })
          .select()
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Hack involvement insert error:', error);
              throw new Error(`Failed to insert hack involvement: ${error.message}`);
            }
            return data;
          });

        allInserts.push(insertPromise);
      });
    });

    const results = await Promise.all(allInserts);
    return results;
  },

  // Get all alumni
  async getAlumni() {
    console.log('Fetching alumni from Supabase...');
    const { data, error } = await supabase
      .from('Alumni')
      .select('*')
      .order('created_at', { ascending: false });
    
    console.log('Alumni fetch result:', { data, error, count: data?.length });
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to fetch alumni: ${error.message}`);
    }
    
    return data || [];
  },

  // Search alumni by name
  async searchAlumni(query: string) {
    const { data, error } = await supabase
      .from('Alumni')
      .select('*')
      .ilike('full_name', `%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Failed to search alumni: ${error.message}`);
    }
    
    return data || [];
  },

  // Filter alumni by category
  async filterAlumni(filters: Record<string, string[]>) {
    let query = supabase.from('Alumni').select('*');
    
    // Map frontend filter keys to database column names
    const columnMap: Record<string, string> = {
      major: 'major',
      year: 'graduation_year',
      location: 'location',
    };
    
    // Apply filters
    Object.entries(filters).forEach(([category, values]) => {
      if (values.length > 0) {
        const dbColumn = columnMap[category];
        if (dbColumn) {
          if (dbColumn === 'graduation_year') {
            // Convert year strings to numbers for graduation_year
            const yearNumbers = values.map(v => parseInt(v, 10)).filter(n => !isNaN(n));
            if (yearNumbers.length > 0) {
              query = query.in(dbColumn, yearNumbers);
            }
          } else {
            query = query.in(dbColumn, values);
          }
        }
      }
    });
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Failed to filter alumni: ${error.message}`);
    }
    
    return data || [];
  },
};
