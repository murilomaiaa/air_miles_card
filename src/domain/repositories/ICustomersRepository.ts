import { Customer } from '../entities';

export interface ICustomersRepository {
  findByEmail(email: string): Promise<Customer | undefined>;
  save(customer: Customer): Promise<Customer>;
}
