import { DeleteCardsController } from '@/application/controllers';
import { DeleteCard } from '@/domain/features/DeleteCard';
import { DeleteCardValidator } from '@/infra/http/validators/DeleteCardValidator';
import { repositories } from '../repositories';

export function makeDeleteCardsController() {
  const cardsRepository = repositories.ICardsRepository;
  const validator = new DeleteCardValidator();
  const service = new DeleteCard(cardsRepository);
  return new DeleteCardsController(validator, service);
}
