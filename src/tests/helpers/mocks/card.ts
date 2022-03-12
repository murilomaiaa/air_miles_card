import { Card, CreditCardCompany } from '@/domain/entities';

export function makeFakeCard(): Card {
  return new Card({
    id: '7925d676-0441-4dc7-8a98-00749dcd0725',
    number: '1234',
    holderName: 'any-name',
    expirationMonth: '12',
    expirationYear: '30',
    creditCardCompany: { name: 'any-creditCardCompany', id: 'cb2a43e8-e092-4b23-a2d3-0de376f8632d' },
  });
}

export function makeFakeCreditCardCompany(name = 'any-creditCardCompany'): CreditCardCompany {
  return new CreditCardCompany({
    name,
    id: '82d840e5-118f-4b8a-942e-72b69e133ab7',
  });
}
