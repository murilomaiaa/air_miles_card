import { CustomersRepository, PlansRepository } from '@/infra/typeorm/repositories';

export const repositories = {
  ICustomersRepository: new CustomersRepository(),
  IPlansRepository: new PlansRepository(),
};
