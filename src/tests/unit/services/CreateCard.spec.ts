import { Card } from '@/domain/entities';
import { CreateCard, CreateCardDTO } from '@/domain/features/CreateCard';
import { ICardsRepository, ICreditCardCompaniesRepository } from '@/domain/repositories';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeCard, makeFakeCreditCardCompany } from '@/tests/helpers/mocks';

describe('CreateCard', () => {
  let systemUnderTests: CreateCard;
  let args: CreateCardDTO.Input;
  let cardsRepository: Mocked<ICardsRepository>;
  let creditCardCompaniesRepository: Mocked<ICreditCardCompaniesRepository>;

  beforeAll(() => {
    cardsRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockImplementation(async card => card),
    };

    creditCardCompaniesRepository = {
      findOrCreateByName: jest.fn().mockImplementation(async name => makeFakeCreditCardCompany(name)),
    };

    args = {
      expiration: '07/29',
      holderName: 'any_name',
      number: '1111222233334444',
      creditCardCompany: {
        name: 'any_creditCardCompany',
      },
    };
  });

  beforeEach(() => {
    systemUnderTests = new CreateCard(cardsRepository, creditCardCompaniesRepository);
  });

  it('should call findOrCreateByName with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(creditCardCompaniesRepository.findOrCreateByName).toBeCalledTimes(1);
    expect(creditCardCompaniesRepository.findOrCreateByName).toBeCalledWith(args.creditCardCompany.name);
  });

  it('should save card with correct args', async () => {
    const card = new Card({
      expirationMonth: '07',
      expirationYear: '29',
      holderName: args.holderName,
      number: args.number,
      creditCardCompany: makeFakeCreditCardCompany(args.creditCardCompany.name),
    });

    await systemUnderTests.execute(args);

    expect(cardsRepository.save).toBeCalledTimes(1);
    expect(cardsRepository.save).toBeCalledWith({ ...card, id: expect.any(String) });
  });

  it('should return the created card', async () => {
    const card = makeFakeCard();
    cardsRepository.save.mockResolvedValueOnce(card);

    const response = await systemUnderTests.execute(args);

    expect(response).toEqual(card);
  });
});
