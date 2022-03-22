import { Card } from '../entities';
import { ICardsRepository } from '../repositories';

export namespace ListCardDTO {
  export type Output = Card[];
}

export interface IListCard {
  execute(): Promise<ListCardDTO.Output>;
}

export class ListCard implements IListCard {
  constructor(private readonly cardsRepository: ICardsRepository) {}

  public async execute(): Promise<ListCardDTO.Output> {
    return this.cardsRepository.findAll();
  }
}
