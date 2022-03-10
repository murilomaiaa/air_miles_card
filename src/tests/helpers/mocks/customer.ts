import { Customer, Group } from '@/domain/entities';

export function makeFakeCustomer(): Customer {
  return new Customer({
    id: '7925d676-0441-4dc7-8a98-00749dcd0725',
    email: 'any-email',
    name: 'any-name',
    password: 'any-password',
    group: { name: 'any-group', id: 'cb2a43e8-e092-4b23-a2d3-0de376f8632d' },
  });
}

export function makeFakeGroup(name = 'any-group'): Group {
  return new Group({
    name,
    id: '82d840e5-118f-4b8a-942e-72b69e133ab7',
  });
}
