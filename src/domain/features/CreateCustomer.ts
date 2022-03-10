import AppError from '@/main/errors/AppError';
import { Customer } from '../entities';
import { IHashProvider } from '../providers';
import { ICustomersRepository, IPlansRepository } from '../repositories';

type PlanInput = { name: string };

export namespace CreateCustomerDTO {
  export type Input = {
    name: string;
    email: string;
    password: string;
    plan: PlanInput;
  };

  export type Output = Customer;
}

export interface ICreateCustomer {
  execute(data: CreateCustomerDTO.Input): Promise<CreateCustomerDTO.Output>;
}

export class CreateCustomer implements ICreateCustomer {
  constructor(
    private readonly customersRepository: ICustomersRepository,
    private readonly plansRepository: IPlansRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    plan: planInput,
    name,
  }: CreateCustomerDTO.Input): Promise<CreateCustomerDTO.Output> {
    let customer = await this.customersRepository.findByEmail(email);

    if (customer) {
      throw new AppError('Email already used');
    }

    const plan = await this.plansRepository.findOrCreate(planInput.name);

    const hashedPassword = await this.hashProvider.hash(password);

    customer = new Customer({
      name,
      email,
      password: hashedPassword,
      plan,
    });

    return this.customersRepository.save(customer);
  }
}
