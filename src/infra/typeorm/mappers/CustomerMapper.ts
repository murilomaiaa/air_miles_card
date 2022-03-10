import { Customer } from '@/domain/entities';
import { CustomerDB } from '../entities';

export class CustomerMapper {
  static mapOne(c: CustomerDB): Customer {
    return new Customer(c);
  }
}
