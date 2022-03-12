import { HttpRequest, HttpResponse } from '@/application/http';
import { ICreateCard, CreateCardDTO } from '@/domain/features/CreateCard';
import { IController } from './IController';

type Response = {
  id: string;
};

export class CreateCardsController implements IController {
  public path: string;
  constructor(private readonly createCard: ICreateCard) {
    this.path = '/cards';
  }

  async handle(request: HttpRequest<CreateCardDTO.Input>): Promise<HttpResponse<Response>> {
    const card = await this.createCard.execute(request.body);
    // notify queue

    return {
      body: { id: card.getId() },
      status: 201,
    };
  }
}
