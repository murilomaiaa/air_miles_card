export const plan = {
  dto: {
    type: 'object',
    required: true,
    properties: {
      name: { type: 'string', required: true },
    },
  },
  example: {
    name: 'Premium',
  },
};
