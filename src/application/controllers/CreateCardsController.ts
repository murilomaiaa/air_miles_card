import { HttpRequest, HttpResponse } from '@/application/http';
import { ICreateCard, CreateCardDTO } from '@/domain/features/CreateCard';
import { ICardPublisher } from '../queue/ICardPublisher';
import { IValidator, IController } from './interfaces';

type Response = {
  id: string;
};

export class CreateCardsController implements IController {
  public path: string;
  constructor(
    private readonly validator: IValidator,
    private readonly createCard: ICreateCard,
    private readonly cardPublisher: ICardPublisher,
  ) {
    this.path = '/cards';
  }

  async handle(request: HttpRequest<CreateCardDTO.Input>): Promise<HttpResponse<Response>> {
    await this.validator.validate(request.body);
    const card = await this.createCard.execute(request.body);

    const { id, holderEmail, holderName, creditCardCompany } = card.toDto();
    this.cardPublisher.create({ id, holderEmail, holderName, creditCardCompanyName: creditCardCompany.name });

    return {
      body: { id },
      status: 201,
    };
  }
}
