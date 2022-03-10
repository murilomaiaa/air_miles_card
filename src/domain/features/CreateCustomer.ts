import AppError from '@/main/errors/AppError';
import { IHashProvider } from '../providers';
import { ICustomersRepository } from '../repositories';

type GroupInput = { id: string } | { name: string };

export namespace CreateCustomerDTO {
  export type Input = {
    name: string;
    email: string;
    password: string;
    group: GroupInput;
  };

  export type Output = void;
}

export interface ICreateCustomer {
  execute(data: CreateCustomerDTO.Input): Promise<CreateCustomerDTO.Output>;
}

export class CreateCustomer implements ICreateCustomer {
  constructor(
    private readonly customersRepository: ICustomersRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: CreateCustomerDTO.Input): Promise<CreateCustomerDTO.Output> {
    const customer = await this.customersRepository.findByEmail(email);

    if (customer) {
      throw new AppError('Email already used');
    }

    await this.hashProvider.hash(password);
  }
}
