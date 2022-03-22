/* eslint-disable camelcase */
import { HttpRequest, HttpResponse } from '@/application/http';
import { CardOutputDTO } from '@/domain/entities';
import { CreateCardDTO } from '@/domain/features/CreateCard';
import { IListCard } from '@/domain/features/ListCards';
import { IController } from './interfaces';

type Response = {
  creditCards: CardOutputDTO[];
};

export class ListCardsController implements IController {
  public path: string;
  constructor(private readonly listCard: IListCard) {
    this.path = '/cards';
  }

  async handle(_: HttpRequest<CreateCardDTO.Input>): Promise<HttpResponse<Response>> {
    const cards = await this.listCard.execute();

    return {
      body: {
        creditCards: cards.map(card => card.toOutput()),
      },
      status: 200,
    };
  }
}
