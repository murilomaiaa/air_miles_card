import { Customer } from '@/domain/entities';

export function makeFakeCustomer(): Customer {
  return new Customer({
    id: '7925d676-0441-4dc7-8a98-00749dcd0725',
    email: 'any-email',
    name: 'any-name',
    password: 'any-password',
    group: { name: 'any-group', id: 'cb2a43e8-e092-4b23-a2d3-0de376f8632d' },
  });
}
