import AppError from '@/main/errors/AppError';
import { ICardsRepository } from '../repositories';

export namespace DeleteCardDTO {
  export type Input = {
    id: string;
  };

  export type Output = void;
}

export interface IDeleteCard {
  execute(data: DeleteCardDTO.Input): Promise<DeleteCardDTO.Output>;
}

export class DeleteCard implements IDeleteCard {
  constructor(private readonly cardsRepository: ICardsRepository) {}

  public async execute(data: DeleteCardDTO.Input): Promise<DeleteCardDTO.Output> {
    const card = await this.cardsRepository.findById(data.id);

    if (!card) {
      throw new AppError('Card not found', 404);
    }

    await this.cardsRepository.remove(card);
  }
}
