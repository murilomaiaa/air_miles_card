import { Customer } from '../entities';

export interface ICustomersRepository {
  findByEmail(email: string): Promise<Customer | undefined>;
}
