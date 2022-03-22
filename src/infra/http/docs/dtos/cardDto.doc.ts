/* eslint-disable camelcase */
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

export const cardOutput = {
  schema: {
    type: 'object',
    required: true,
    properties: {
      id: { type: 'string', required: true },
      brand: { type: 'string', required: true },
      holder_name: { type: 'string', required: true },
      last_digits: { type: 'string', required: true },
    },
  },
  example: {
    id: 'c3c7ab22-7ced-4bfd-a7a0-249eccbc72d4',
    brand: 'Visa',
    holder_name: 'Rock Lee',
    last_digits: '4444',
  },
};
