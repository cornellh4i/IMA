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
};