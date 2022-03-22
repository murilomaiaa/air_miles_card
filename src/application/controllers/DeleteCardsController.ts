import { HttpRequest, HttpResponse } from '@/application/http';
import { CreateCardDTO } from '@/domain/features/CreateCard';
import { IDeleteCard } from '@/domain/features/DeleteCard';
import { IValidator, IController } from './interfaces';

type Response = undefined;

export class DeleteCardsController implements IController {
  public path: string;
  constructor(private readonly validator: IValidator, private readonly deleteCard: IDeleteCard) {
    this.path = '/cards/:id';
  }

  async handle(request: HttpRequest<CreateCardDTO.Input>): Promise<HttpResponse<Response>> {
    const r = {
      id: request.params.id as string,
    };
    await this.validator.validate(r);
    await this.deleteCard.execute(r);

    return {
      body: undefined,
      status: 200,
    };
  }
}
