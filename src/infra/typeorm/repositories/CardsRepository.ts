import { getRepository, Repository } from 'typeorm';
import { Card } from '@/domain/entities';
import { ICardsRepository } from '@/domain/repositories';
import { CardDB } from '../entities';
import { CardMapper } from '../mappers';

export class CardsRepository implements ICardsRepository {
  private readonly repository: Repository<CardDB>;

  constructor() {
    this.repository = getRepository(CardDB);
  }

  async findByEmail(email: string): Promise<Card | undefined> {
    const card = await this.repository.findOne({ where: { email } });

    return card ? CardMapper.mapOne(card) : undefined;
  }

  async save(card: Card): Promise<Card> {
    const dto = card.toDto();
    const savedCard = await this.repository.save(dto);

    return CardMapper.mapOne(savedCard);
  }
}
