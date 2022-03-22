import { Card } from '@/domain/entities';
import { UpdateCard, UpdateCardDTO } from '@/domain/features/UpdateCard';
import { ICardsRepository, ICreditCardCompaniesRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeCard, makeFakeCreditCardCompany } from '@/tests/helpers/mocks';

describe('UpdateCard', () => {
  let systemUnderTests: UpdateCard;
  let args: UpdateCardDTO.Input;
  let cardsRepository: Mocked<ICardsRepository>;
  let creditCardCompaniesRepository: Mocked<ICreditCardCompaniesRepository>;

  beforeAll(() => {
    args = {
      id: 'any_id',
      expiration: '07/29',
      holderName: 'any_name',
      number: '1111222233334444',
      creditCardCompany: {
        name: 'any_company',
      },
      cvv: '123',
      holderEmail: 'any_mail@mail.com',
    };

    const c = makeFakeCard(args.id);
    cardsRepository = {
      findById: jest.fn().mockResolvedValue(c),
      findByEmail: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockImplementation(async card => card),
      findAll: jest.fn(),
    } as Mocked<ICardsRepository>;

    creditCardCompaniesRepository = {
      findOrCreateByName: jest.fn().mockImplementation(async name => makeFakeCreditCardCompany(name)),
    };
  });

  beforeEach(() => {
    systemUnderTests = new UpdateCard(cardsRepository, creditCardCompaniesRepository);
  });

  it('should call findById with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(cardsRepository.findById).toBeCalledTimes(1);
    expect(cardsRepository.findById).toBeCalledWith(args.id);
  });

  it('should throws when card is not registered', async () => {
    cardsRepository.findById.mockResolvedValueOnce(undefined);

    const promise = systemUnderTests.execute(args);

    await expect(promise).rejects.toEqual(new AppError('Card not found'));
  });

  it('should call findOrCreateByName with correct args when its provided', async () => {
    await systemUnderTests.execute(args);

    expect(creditCardCompaniesRepository.findOrCreateByName).toBeCalledTimes(1);
    expect(creditCardCompaniesRepository.findOrCreateByName).toBeCalledWith(args.creditCardCompany?.name);
  });

  it('should not call findOrCreateByName when its not provided', async () => {
    await systemUnderTests.execute({ ...args, creditCardCompany: undefined });

    expect(creditCardCompaniesRepository.findOrCreateByName).toBeCalledTimes(0);
  });

  it('should save card with correct args', async () => {
    const card = new Card({
      id: args.id,
      expirationMonth: '07',
      expirationYear: '29',
      holderName: args.holderName as string,
      number: args.number as string,
      cvv: args.cvv as string,
      holderEmail: args.holderEmail as string,
      creditCardCompany: makeFakeCreditCardCompany(args.creditCardCompany?.name),
    });

    await systemUnderTests.execute(args);

    expect(cardsRepository.save).toBeCalledTimes(1);
    expect(cardsRepository.save).toBeCalledWith(card);
  });

  it('should use registered data when data is not provided', async () => {
    const returnedCard = makeFakeCard(args.id);
    cardsRepository.findById.mockResolvedValueOnce(returnedCard);
    const c = returnedCard.toDto();

    const card = new Card({
      id: args.id,
      expirationMonth: '12',
      expirationYear: '30',
      holderName: c.holderName,
      number: c.number,
      cvv: c.cvv,
      holderEmail: c.holderEmail,
      creditCardCompany: c.creditCardCompany,
    });

    await systemUnderTests.execute({
      id: args.id,
    });

    expect(cardsRepository.save).toBeCalledTimes(1);
    expect(cardsRepository.save).toBeCalledWith({
      ...card,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      creditCardCompany: {
        createdAt: expect.any(Date),
        name: 'any-creditCardCompany',
        id: 'cb2a43e8-e092-4b23-a2d3-0de376f8632d',
      },
    });
  });
});
