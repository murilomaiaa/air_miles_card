import { CreateCustomersController } from '@/application/controllers/customers/CreateCustomersController';
import { CreateCustomer } from '@/domain/features/CreateCustomer';
import { repositories } from '../repositories';

export function makeCreateCustomersController() {
  const customersRepository = repositories.ICustomersRepository;
  const plansRepository = repositories.IPlansRepository;
  const service = new CreateCustomer(customersRepository, plansRepository, { hash: async tohash => tohash });
  return new CreateCustomersController(service);
}
