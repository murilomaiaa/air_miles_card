import { creditCardCompany } from './creditCardCompanyDto.doc';

export const card = {
  schema: {
    type: 'object',
    required: true,
    properties: {
      number: { type: 'string', required: true },
      holderName: { type: 'string', required: true },
      holderEmail: { type: 'string', required: true },
      expiration: { type: 'string', required: true },
      cvv: { type: 'string', required: true },
      creditCardCompany: creditCardCompany.dto,
    },
  },
  example: {
    number: '1111222233334444',
    holderName: 'Rock Lee',
    holderEmail: 'rock_lee@mail.com',
    expiration: '12/29',
    cvv: '567',
    creditCardCompany: creditCardCompany.example,
  },
};
