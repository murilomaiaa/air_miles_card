import { CreateCustomer, CreateCustomerDTO } from '@/domain/features/CreateCustomer';
import { IHashProvider } from '@/domain/providers';
import { ICustomersRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeCustomer } from '@/tests/helpers/mocks';

describe('CreateCustomer', () => {
  let systemUnderTests: CreateCustomer;
  let args: CreateCustomerDTO.Input;
  let customersRepository: Mocked<ICustomersRepository>;
  let hashProvider: Mocked<IHashProvider>;

  beforeAll(() => {
    customersRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
    };

    hashProvider = {
      hash: jest.fn().mockResolvedValue('hashed'),
    };

    args = {
      email: 'any@mail.com',
      name: 'any_name',
      password: 'any_password',
      group: {
        name: 'any_group',
      },
    };
  });

  beforeEach(() => {
    systemUnderTests = new CreateCustomer(customersRepository, hashProvider);
  });

  it('should call findByEmail with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(customersRepository.findByEmail).toBeCalledTimes(1);
    expect(customersRepository.findByEmail).toBeCalledWith(args.email);
  });

  it('should throws if email is already registered', async () => {
    customersRepository.findByEmail.mockResolvedValueOnce(makeFakeCustomer());

    const promise = systemUnderTests.execute(args);

    await expect(promise).rejects.toEqual(new AppError('Email already used'));
  });

  it('should call hashProvider with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(hashProvider.hash).toBeCalledTimes(1);
    expect(hashProvider.hash).toBeCalledWith(args.password);
  });
});
