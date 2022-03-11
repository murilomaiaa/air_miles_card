import { CreateCustomersController } from '@/application/controllers/customers/CreateCustomersController';
import { CreateCustomer } from '@/domain/features/CreateCustomer';
import { HashProvider } from '@/infra/providers';
import { repositories } from '../repositories';

export function makeCreateCustomersController() {
  const customersRepository = repositories.ICustomersRepository;
  const plansRepository = repositories.IPlansRepository;
  const hashProvider = new HashProvider(12);
  const service = new CreateCustomer(customersRepository, plansRepository, hashProvider);
  return new CreateCustomersController(service);
}
