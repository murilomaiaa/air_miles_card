import { CreateCustomer, CreateCustomerDTO } from '@/domain/features/CreateCustomer';
import { ICustomersRepository } from '@/domain/repositories';
import { Mocked } from '@/tests/helpers/Mocked';

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
});
