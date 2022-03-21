import { CreateCardsController } from '@/application/controllers';
import { CreateCard } from '@/domain/features/CreateCard';
import { CreateCardValidator } from '@/infra/http/validators/CreateCardValidator';
import { CardPublisher } from '@/infra/queue/publishers/CardPublisher';
import { RabbitMQServer } from '@/infra/queue/RabbitMQServer';
import { repositories } from '../repositories';

export function makeCreateCardsController() {
  const cardsRepository = repositories.ICardsRepository;
  const creditCardCompaniesRepository = repositories.ICreditCardCompaniesRepository;
  const service = new CreateCard(cardsRepository, creditCardCompaniesRepository);
  const cardPublisher = new CardPublisher(RabbitMQServer.getInstance());
  const validator = new CreateCardValidator();
  return new CreateCardsController(validator, service, cardPublisher);
}
