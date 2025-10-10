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
    }
  },
  '/api/members/{id}': {
    post: {
      summary: 'Update a member',
      description: 'Update a member by their unique ID',
      tags: ['Members'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the member to update',
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MemberUpdate'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Member successfully updated',
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