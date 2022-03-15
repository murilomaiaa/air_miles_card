import { CardToPublish, ICardPublisher } from '@/application/queue/ICardPublisher';
import { RabbitMQServer } from '../RabbitMQServer';

export class CardPublisher implements ICardPublisher {
  public queueName: string;
  private server: RabbitMQServer;

  constructor(server: RabbitMQServer) {
    this.server = server;
    this.queueName = 'CreateCard';
  }

  create(data: CardToPublish): void {
    console.log('publishing ', data);
    this.server.publishInQueue(this.queueName, JSON.stringify(data));
  }
}
