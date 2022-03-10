import { CreateCustomer, CreateCustomerDTO } from '@/domain/features/CreateCustomer';
import { ICustomersRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeCustomer } from '@/tests/helpers/mocks';

describe('CreateCustomer', () => {
  let systemUnderTests: CreateCustomer;
  let args: CreateCustomerDTO.Input;
  let customersRepository: Mocked<ICustomersRepository>;

  beforeAll(() => {
    customersRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
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
    systemUnderTests = new CreateCustomer(customersRepository);
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
});
