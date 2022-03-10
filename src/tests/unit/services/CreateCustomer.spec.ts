import { Customer } from '@/domain/entities';
import { CreateCustomer, CreateCustomerDTO } from '@/domain/features/CreateCustomer';
import { IHashProvider } from '@/domain/providers';
import { ICustomersRepository, IPlansRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeCustomer, makeFakePlan } from '@/tests/helpers/mocks';

describe('CreateCustomer', () => {
  let systemUnderTests: CreateCustomer;
  let args: CreateCustomerDTO.Input;
  let customersRepository: Mocked<ICustomersRepository>;
  let plansRepository: Mocked<IPlansRepository>;
  let hashProvider: Mocked<IHashProvider>;

  beforeAll(() => {
    customersRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockImplementation(async customer => customer),
    };

    plansRepository = {
      findOrCreate: jest.fn().mockImplementation(async name => makeFakePlan(name)),
    };

    hashProvider = {
      hash: jest.fn().mockResolvedValue('hashed'),
    };

    args = {
      email: 'any@mail.com',
      name: 'any_name',
      password: 'any_password',
      plan: {
        name: 'any_plan',
      },
    };
  });

  beforeEach(() => {
    systemUnderTests = new CreateCustomer(customersRepository, plansRepository, hashProvider);
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

  it('should call findOrCreate with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(plansRepository.findOrCreate).toBeCalledTimes(1);
    expect(plansRepository.findOrCreate).toBeCalledWith(args.plan.name);
  });

  it('should call hashProvider with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(hashProvider.hash).toBeCalledTimes(1);
    expect(hashProvider.hash).toBeCalledWith(args.password);
  });

  it('should save customer with correct args', async () => {
    const customer = new Customer({
      email: args.email,
      name: args.name,
      password: 'hashed',
      plan: makeFakePlan(args.plan.name),
    });

    await systemUnderTests.execute(args);

    expect(customersRepository.save).toBeCalledTimes(1);
    expect(customersRepository.save).toBeCalledWith({ ...customer, id: expect.any(String) });
  });

  it('should return the created customer', async () => {
    const customer = makeFakeCustomer();
    customersRepository.save.mockResolvedValueOnce(customer);

    const response = await systemUnderTests.execute(args);

    expect(response).toEqual(customer);
  });
});
