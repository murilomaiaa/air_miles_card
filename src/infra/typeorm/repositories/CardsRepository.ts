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

  async findById(id: string): Promise<Card | undefined> {
    const card = await this.repository.findOne(id);
    return card ? CardMapper.mapOne(card) : card;
  }

  async findAll(): Promise<Card[]> {
    const cards = await this.repository.find();
    return CardMapper.mapMany(cards);
  }

  async findByEmail(email: string): Promise<Card | undefined> {
    const card = await this.repository.findOne({ where: { email } });

    return card ? CardMapper.mapOne(card) : undefined;
  }

  async remove(card: Card): Promise<void> {
    await this.repository.softRemove({ id: card.getId() });
  }

  async save(card: Card): Promise<Card> {
    const dto = card.toDto();
    const savedCard = await this.repository.save(dto);

    return CardMapper.mapOne(savedCard);
  }
}
