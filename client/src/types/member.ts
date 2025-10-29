// Unified Member type that matches Supabase column names
// Maps snake_case database fields to camelCase frontend fields
export interface Member {
  id: string;
  name: string;
  profilePicture?: string | null; // maps from profile_picture
  role: string;
  team: string;
  dateJoined: string; // maps from date_joined
  email: string;
  linkedin?: string | null; // maps from linkedIn
  bio?: string | null;
  createdAt?: string; // maps from created_at
  
  // Additional fields that might be used in the frontend
  year?: string;
  major?: string;
  pronouns?: string;
  location?: string;
  slack?: string;
  imgURL?: string; // alias for profilePicture for backward compatibility
}

// Raw Supabase row type (snake_case)
export interface SupabaseMemberRow {
  id: string;
  name: string;
  profile_picture?: string | null;
  role: string;
  team: string;
  date_joined?: string;
  email: string;
  linkedIn?: string | null; // Note: server uses linkedIn (camelCase)
  bio?: string | null;
  created_at?: string;
}

// Helper function to transform Supabase row to frontend Member
export function transformSupabaseMember(row: SupabaseMemberRow): Member {
  return {
    id: row.id,
    name: row.name,
    profilePicture: row.profile_picture,
    imgURL: row.profile_picture ?? undefined, // backward compatibility
    role: row.role,
    team: row.team,
    dateJoined: row.date_joined || '',
    email: row.email,
    linkedin: row.linkedIn ?? undefined,
    bio: row.bio,
    createdAt: row.created_at,
  };
}

// Helper function to transform frontend Member to Supabase insert format
export function transformToSupabaseInsert(member: Omit<Member, 'id' | 'createdAt'>): Partial<SupabaseMemberRow> {
  return {
    name: member.name,
    profile_picture: member.profilePicture || member.imgURL,
    role: member.role,
    team: member.team,
    date_joined: member.dateJoined,
    email: member.email,
    linkedIn: member.linkedin,
    bio: member.bio,
  };
}
