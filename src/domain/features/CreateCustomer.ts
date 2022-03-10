import AppError from '@/main/errors/AppError';
import { Customer } from '../entities';
import { IHashProvider } from '../providers';
import { ICustomersRepository, IGroupsRepository } from '../repositories';

type GroupInput = { name: string };

export namespace CreateCustomerDTO {
  export type Input = {
    name: string;
    email: string;
    password: string;
    group: GroupInput;
  };

  export type Output = Customer;
}

export interface ICreateCustomer {
  execute(data: CreateCustomerDTO.Input): Promise<CreateCustomerDTO.Output>;
}

export class CreateCustomer implements ICreateCustomer {
  constructor(
    private readonly customersRepository: ICustomersRepository,
    private readonly groupsRepository: IGroupsRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    group: groupInput,
    name,
  }: CreateCustomerDTO.Input): Promise<CreateCustomerDTO.Output> {
    let customer = await this.customersRepository.findByEmail(email);

    if (customer) {
      throw new AppError('Email already used');
    }

    const group = await this.groupsRepository.findOrCreate(groupInput.name);

    const hashedPassword = await this.hashProvider.hash(password);

    customer = new Customer({
      name,
      email,
      password: hashedPassword,
      group,
    });

    return this.customersRepository.save(customer);
  }
}
