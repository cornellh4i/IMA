export const memberSchemas = {
  Member: {
    type: 'object',
    properties: {
      id: { 
        type: 'string',
        description: 'Unique identifier for the member'
      },
      name: { 
        type: 'string',
        description: 'Full name of the member'
      },
      profile_picture: { 
        type: 'string',
        nullable: true,
        description: 'URL to profile picture'
      },
      role: { 
        type: 'string',
        enum: ['COD', 'TL/PM', 'Engineering Chair', 'Design Lead', 'NME Instructor', 'Member', 'Newbie'],
        description: 'Role of the member in the organization'
      },
      team: { 
        type: 'string',
        description: 'Team the member belongs to'
      },
      date_joined: { 
        type: 'string',
        format: 'date',
        description: 'Date when the member joined'
      },
      email: { 
        type: 'string',
        format: 'email',
        description: 'Email address of the member'
      },
      linkedIn: { 
        type: 'string',
        nullable: true,
        description: 'LinkedIn profile URL'
      },
      bio: { 
        type: 'string',
        nullable: true,
        description: 'Short biography of the member'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp when the record was created'
      }
    },
    required: ['id', 'name', 'role', 'team', 'dateJoined', 'email']
  },
  
  MemberList: {
    type: 'array',
    items: {
      $ref: '#/components/schemas/Member'
    }
  },
  
  MemberUpdate: {
    type: 'object',
    properties: {
      name: { 
        type: 'string',
        description: 'Full name of the member'
      },
      profile_picture: { 
        type: 'string',
        nullable: true,
        description: 'URL to profile picture'
      },
      role: { 
        type: 'string',
        enum: ['COD', 'TL/PM', 'Engineering Chair', 'Design Lead', 'NME Instructor', 'Member', 'Newbie'],
        description: 'Role of the member in the organization'
      },
      team: { 
        type: 'string',
        description: 'Team the member belongs to'
      },
      date_joined: { 
        type: 'string',
        format: 'date',
        description: 'Date when the member joined'
      },
      email: { 
        type: 'string',
        format: 'email',
        description: 'Email address of the member'
      },
      linkedIn: { 
        type: 'string',
        nullable: true,
        description: 'LinkedIn profile URL'
      },
      bio: { 
        type: 'string',
        nullable: true,
        description: 'Short biography of the member'
      }
    },
    description: 'Fields that can be updated for a member. All fields are optional.'
  },
  
  Error: {
    type: 'object',
    properties: {
      error: {
        type: 'string',
        description: 'Error message'
      }
    }
  },

  MemberFields: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Full name of the member'
      },
      profile_picture: {
        type: 'string',
        nullable: true,
        description: 'URL to profile picture'
      },
      role: {
        type: 'string',
        enum: ['COD', 'TL/PM', 'Engineering Chair', 'Design Lead', 'NME Instructor', 'Member', 'Newbie'],
        description: 'Role of the member in the organization'
      },
      team: {
        type: 'string',
        description: 'Team the member belongs to'
      },
      date_joined: {
        type: 'string',
        format: 'date',
        description: 'Date when the member joined'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Email address of the member'
      },
      linkedIn: {
        type: 'string',
        nullable: true,
        description: 'LinkedIn profile URL'
    }, bio: {
        type: 'string',
        nullable: true,
        description: 'Short biography of the member'
      }
    },
    required: ['name', 'role', 'team', 'date_joined', 'email', 'linkedIn', 'bio']
  }
};

export const alumniSchemas = {
  Alumni: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the alumni'
      },
      profile_url: {
        type: 'string',
        nullable: true,
        description: 'URL to profile picture'
      },
      full_name: {
        type: 'string',
        nullable: true,
        description: 'Full name of the alumni'
      },
      emails: {
        type: 'array',
        items: {
          type: 'string'
        },
        nullable: true,
        description: 'Array of email addresses'
      },
      phone: {
        type: 'string',
        nullable: true,
        description: 'Phone number'
      },
      linkedin_url: {
        type: 'string',
        nullable: true,
        description: 'LinkedIn profile URL'
      },
      instagram_url: {
        type: 'string',
        nullable: true,
        description: 'Instagram profile URL'
      },
      graduation_year: {
        type: 'string',
        nullable: true,
        description: 'Graduation year'
      },
      major: {
        type: 'string',
        nullable: true,
        description: 'Major field of study'
      },
      location: {
        type: 'string',
        nullable: true,
        description: 'Current location'
      },
      skills: {
        type: 'array',
        items: {
          type: 'string'
        },
        nullable: true,
        description: 'Array of skills'
      },
      interests: {
        type: 'array',
        items: {
          type: 'string'
        },
        nullable: true,
        description: 'Array of interests'
      },
      bio: {
        type: 'string',
        nullable: true,
        description: 'Biography of the alumni'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Timestamp when the record was created'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Timestamp when the record was last updated'
      }
    },
    required: ['id', 'created_at']
  },
  
  AlumniList: {
    type: 'array',
    items: {
      $ref: '#/components/schemas/Alumni'
    }
  }
};