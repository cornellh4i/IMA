export const memberPaths = {
  '/api/members': {
    get: {
      summary: 'Get all members',
      description: 'Retrieve a list of all members in the organization',
      tags: ['Members'],
      responses: {
        '200': {
          description: 'Successfully retrieved all members',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MemberList'
              }
            }
          }
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    },
    post: {
      summary: 'Add a new member',
      description: 'Add a new member to the organization',
      tags: ['Members'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MemberFields'
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Successfully added a new member',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Member'
              }
            }
          }
        },
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  '/api/members/{id}': {
    get: {
      summary: 'Get member by ID',
      description: 'Retrieve a specific member by their unique ID',
      tags: ['Members'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'The unique identifier of the member',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        '200': {
          description: 'Successfully retrieved member',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Member'
              }
            }
          }
        },
        '400': {
          description: 'Bad request - Member ID is required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        '404': {
          description: 'Member not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  }
};

export const alumniPaths = {
  '/api/alumni': {
    get: {
      summary: 'Get all alumni',
      description: 'Retrieve a list of all alumni',
      tags: ['Alumni'],
      responses: {
        '200': {
          description: 'Successfully retrieved all alumni',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AlumniList'
              }
            }
          }
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  '/api/alumni/{id}': {
    get: {
      summary: 'Get alumni by ID',
      description: 'Retrieve a specific alumni by their unique ID',
      tags: ['Alumni'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'The unique identifier of the alumni',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        '200': {
          description: 'Successfully retrieved alumni',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Alumni'
              }
            }
          }
        },
        '400': {
          description: 'Bad request - Alumni ID is required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        '404': {
          description: 'Alumni not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  '/api/alumni/query': {
    get: {
      summary: 'Query alumni',
      description: 'Query alumni by non-URL fields. Supports ILIKE search for string fields, range queries with _gte/_lte suffixes, and array field filtering. URL fields (profile_url, linkedin_url, instagram_url) are excluded from filters.',
      tags: ['Alumni'],
      parameters: [
        {
          name: 'full_name',
          in: 'query',
          required: false,
          description: 'Filter by full name (case-insensitive partial match)',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'phone',
          in: 'query',
          required: false,
          description: 'Filter by phone number (case-insensitive partial match)',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'location',
          in: 'query',
          required: false,
          description: 'Filter by location (case-insensitive partial match)',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'bio',
          in: 'query',
          required: false,
          description: 'Filter by bio text (case-insensitive partial match)',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'graduation_year',
          in: 'query',
          required: false,
          description: 'Filter by graduation year (case-insensitive partial match)',
          schema: {
            type: 'number'
          }
        },
        {
          name: 'major',
          in: 'query',
          required: false,
          description: 'Filter by major (case-insensitive partial match)',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'emails',
          in: 'query',
          required: false,
          description: 'Filter by emails (comma-separated values supported)',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'skills',
          in: 'query',
          required: false,
          description: 'Filter by skills (comma-separated values supported)',
          schema: {
            type: 'string'
          }
        },
        {
          name: 'interests',
          in: 'query',
          required: false,
          description: 'Filter by interests (comma-separated values supported)',
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        '200': {
          description: 'Successfully queried alumni',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AlumniList'
              }
            }
          }
        },
        '400': {
          description: 'Bad request - URL fields cannot be used in query filters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  }
};