import { makeCreateCustomersController } from '@/main/factories/controllers/makeCreateCustomersController';
import { customer } from '../dtos/customerDto.doc';
import { make201, make400, make404, make500 } from '../responses.doc';

export const customersRoute = {
  [makeCreateCustomersController().path]: {
    post: {
      tags: ['Faithful'],
      summary: 'Create a new faithful',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: customer.schema,
            example: customer.example,
          },
        },
      },
      responses: {
        '201': make201({
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'b765ae09-012a-420e-96c2-ad5f0f0f9019',
            },
          },
        }),
        '400': make400({
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              example: 'Email already used',
            },
          },
        }),
        '404': make404(),
        '500': make500(),
      },
    },
  },
};
