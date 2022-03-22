import { Card } from '../entities';

export interface ICardsRepository {
  findByEmail(email: string): Promise<Card | undefined>;
  findById(id: string): Promise<Card | undefined>;
  findAll(): Promise<Card[]>;
  save(card: Card): Promise<Card>;
}
