export const creditCardCompany = {
  dto: {
    type: 'object',
    required: true,
    properties: {
      name: { type: 'string', required: true },
    },
  },
  example: {
    name: 'Visa',
  },
};
