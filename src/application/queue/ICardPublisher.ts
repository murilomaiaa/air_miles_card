export type CardToPublish = {
  id: string;
  holderEmail: string;
  holderName: string;
  creditCardCompanyName: string;
};

export interface ICardPublisher {
  queueName: string;
  create(data: CardToPublish): void;
}
