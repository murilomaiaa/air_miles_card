export const make200 = (schema: object) => ({
  description: 'OK',
  content: {
    'application/json': {
      schema,
    },
  },
});

export const make201 = (schema: object) => ({
  description: 'Created',
  content: {
    'application/json': {
      schema,
    },
  },
});

export const make400 = (schema: object) => ({
  description: 'Bad Request',
  content: {
    'application/json': {
      schema,
    },
  },
});

export const make404 = (message = 'Not found') => ({
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error',
          },
          message: {
            type: 'string',
            example: message,
          },
        },
      },
    },
  },
});

export const make500 = () => ({
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error',
          },
          message: {
            type: 'string',
            example: 'Internal server error',
          },
        },
      },
    },
  },
});
