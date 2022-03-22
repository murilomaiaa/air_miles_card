import { Card, CreditCardCompany } from '@/domain/entities';

export function makeFakeCard(id = '7925d676-0441-4dc7-8a98-00749dcd0725'): Card {
  return new Card({
    id,
    number: '1234',
    holderName: 'any-name',
    holderEmail: 'any@mail.com',
    expirationMonth: '12',
    expirationYear: '30',
    cvv: '123',
    creditCardCompany: { name: 'any-creditCardCompany', id: 'cb2a43e8-e092-4b23-a2d3-0de376f8632d' },
  });
}

export function makeFakeCreditCardCompany(name = 'any-credit-card-company'): CreditCardCompany {
  return new CreditCardCompany({
    name,
    id: '82d840e5-118f-4b8a-942e-72b69e133ab7',
  });
}
