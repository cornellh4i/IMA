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
  }
};