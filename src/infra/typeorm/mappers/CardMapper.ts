import { Card } from '@/domain/entities';
import { CardDB } from '../entities';

export class CardMapper {
  static mapOne(c: CardDB): Card {
    return new Card(c);
  }
}
