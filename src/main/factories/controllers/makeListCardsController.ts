import { ListCardsController } from '@/application/controllers';
import { ListCard } from '@/domain/features/ListCards';
import { repositories } from '../repositories';

export function makeListCardsController() {
  const cardsRepository = repositories.ICardsRepository;
  const service = new ListCard(cardsRepository);
  return new ListCardsController(service);
}
