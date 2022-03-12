import { CreateCardsController } from '@/application/controllers';
import { CreateCard } from '@/domain/features/CreateCard';
import { repositories } from '../repositories';

export function makeCreateCardsController() {
  const cardsRepository = repositories.ICardsRepository;
  const creditCardCompaniesRepository = repositories.ICreditCardCompaniesRepository;
  const service = new CreateCard(cardsRepository, creditCardCompaniesRepository);
  return new CreateCardsController(service);
}
