import { getRepository, Repository } from 'typeorm';
import { Customer } from '@/domain/entities';
import { ICustomersRepository } from '@/domain/repositories';
import { CustomerDB } from '../entities';
import { CustomerMapper } from '../mappers';

export class CustomersRepository implements ICustomersRepository {
  private readonly repository: Repository<CustomerDB>;

  constructor() {
    this.repository = getRepository(CustomerDB);
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({ where: { email } });

    return customer ? CustomerMapper.mapOne(customer) : undefined;
  }

  async save(customer: Customer): Promise<Customer> {
    const dto = customer.toDto();
    const savedCustomer = await this.repository.save(dto);

    return CustomerMapper.mapOne(savedCustomer);
  }
}
