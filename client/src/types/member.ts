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

// Alumni type for the Alumni table
export interface Alumni {
  id: string;
  name: string;
  emails: string[];
  phone?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  graduationYear: number | null;
  major: string | null;
  location?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  bio?: string | null;
  profileUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Raw Supabase Alumni row type (snake_case)
export interface SupabaseAlumniRow {
  id: string;
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
  profile_url: string | null;
  created_at: string;
  updated_at: string | null;
}

// Helper function to transform Supabase Alumni row to frontend Alumni
export function transformSupabaseAlumni(row: SupabaseAlumniRow): Alumni {
  return {
    id: row.id,
    name: row.full_name || '',
    emails: row.emails || [],
    phone: row.phone,
    linkedinUrl: row.linkedin_url,
    instagramUrl: row.instagram_url,
    graduationYear: row.graduation_year,
    major: row.major,
    location: row.location,
    skills: row.skills,
    interests: row.interests,
    bio: row.bio,
    profileUrl: row.profile_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at || undefined,
  };
}
