import env from '@/main/config/env';
import { Channel, connect, Connection } from 'amqplib';

export class RabbitMQServer {
  private static instance: RabbitMQServer;
  private connection!: Connection;
  private channel!: Channel;

  private constructor(private uri: string) {}

  public static getInstance(): RabbitMQServer {
    if (!this.instance) {
      const { host, password, port, username } = env.queue;
      this.instance = new RabbitMQServer(`amqp://${username}:${password}@${host}:${port}`);
    }

    return this.instance;
  }

  async start(): Promise<void> {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  publishInQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  assertQueue(queue: string) {
    return this.channel.assertQueue(queue);
  }
}
