import { Card } from '@/domain/entities';
import { DeleteCard, DeleteCardDTO } from '@/domain/features/DeleteCard';
import { ICardsRepository } from '@/domain/repositories';
import AppError from '@/main/errors/AppError';
import { Mocked } from '@/tests/helpers/Mocked';
import { makeFakeCard } from '@/tests/helpers/mocks';

describe('DeleteCard', () => {
  let systemUnderTests: DeleteCard;
  let args: DeleteCardDTO.Input;
  let cardsRepository: Mocked<ICardsRepository>;
  let insertedCard: Card;

  beforeAll(() => {
    insertedCard = makeFakeCard();
    cardsRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockImplementation(async card => card),
      remove: jest.fn(),
      findById: jest.fn().mockResolvedValue(insertedCard),
    } as Mocked<ICardsRepository>;

    args = {
      id: 'any_id',
    };
  });

  beforeEach(() => {
    systemUnderTests = new DeleteCard(cardsRepository);
  });

  it('should call findById with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(cardsRepository.findById).toBeCalledTimes(1);
    expect(cardsRepository.findById).toBeCalledWith(args.id);
  });

  it('should throw when card is not registered', async () => {
    cardsRepository.findById.mockResolvedValueOnce(undefined);

    const promise = systemUnderTests.execute(args);

    await expect(promise).rejects.toEqual(new AppError('Card not found', 404));
  });

  it('should call remove with correct args with correct args', async () => {
    await systemUnderTests.execute(args);

    expect(cardsRepository.remove).toBeCalledTimes(1);
    expect(cardsRepository.remove).toBeCalledWith(insertedCard);
  });
});
