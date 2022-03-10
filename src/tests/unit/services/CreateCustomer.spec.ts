import { Customer } from '@/domain/entities';
import { CreateCustomer, CreateCustomerDTO } from '@/domain/features/CreateCustomer';
import { IHashProvider } from '@/domain/providers';
import { ICustomersRepository, IGroupsRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeCustomer, makeFakeGroup } from '@/tests/helpers/mocks';

describe('CreateCustomer', () => {
  let systemUnderTests: CreateCustomer;
  let args: CreateCustomerDTO.Input;
  let customersRepository: Mocked<ICustomersRepository>;
  let groupsRepository: Mocked<IGroupsRepository>;
  let hashProvider: Mocked<IHashProvider>;

  beforeAll(() => {
    customersRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockImplementation(async customer => customer),
    };

    groupsRepository = {
      findOrCreate: jest.fn().mockImplementation(async name => makeFakeGroup(name)),
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
    systemUnderTests = new CreateCustomer(customersRepository, groupsRepository, hashProvider);
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

    expect(groupsRepository.findOrCreate).toBeCalledTimes(1);
    expect(groupsRepository.findOrCreate).toBeCalledWith(args.group.name);
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
      group: makeFakeGroup(args.group.name),
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
