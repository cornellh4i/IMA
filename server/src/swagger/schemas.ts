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