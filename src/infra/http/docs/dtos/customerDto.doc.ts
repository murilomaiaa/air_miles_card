import { plan } from './planDto.doc';

export const customer = {
  schema: {
    type: 'object',
    required: true,
    properties: {
      name: { type: 'string', required: true },
      email: { type: 'string', required: true },
      password: { type: 'string', required: true },
      plan: plan.dto,
    },
  },
  example: {
    name: 'Alan Turing',
    email: 'alan@mail.com',
    password: 'strong_password',
    plan: plan.example,
  },
};
