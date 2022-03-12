import { Card } from '../entities';

export interface ICardsRepository {
  findByEmail(email: string): Promise<Card | undefined>;
  save(card: Card): Promise<Card>;
}
