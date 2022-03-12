import { ICardPublisher } from '@/application/queue/ICardPublisher';
import { CardPublisher } from './publishers/CardPublisher';
import { RabbitMQServer } from './RabbitMQServer';

export class RabbitMQBroker {
  private readonly server: RabbitMQServer;
  private readonly cardsPublisher: ICardPublisher;

  constructor() {
    this.server = RabbitMQServer.getInstance();
    this.cardsPublisher = new CardPublisher(this.server);
  }

  async start() {
    await this.server.start();

    await this.server.assertQueue(this.cardsPublisher.queueName);
  }
}
