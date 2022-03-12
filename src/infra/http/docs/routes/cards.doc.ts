import { makeCreateCardsController } from '@/main/factories/controllers/makeCreateCardsController';
import { card } from '../dtos/cardDto.doc';
import { make201, make400, make404, make500 } from '../responses.doc';

export const cardsRoute = {
  [makeCreateCardsController().path]: {
    post: {
      tags: ['Cards'],
      summary: 'Create a new card',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: card.schema,
            example: card.example,
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
              example: 'Invalid month',
            },
          },
        }),
        '404': make404(),
        '500': make500(),
      },
    },
  },
};
