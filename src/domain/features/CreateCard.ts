import { Card } from '../entities';
import { ICardsRepository, ICreditCardCompaniesRepository } from '../repositories';

type CreditCardCompanyInput = { name: string };

export namespace CreateCardDTO {
  export type Input = {
    number: string;
    holderName: string;
    holderEmail: string;
    expiration: string;
    cvv: string;
    creditCardCompany: CreditCardCompanyInput;
  };

  export type Output = Card;
}

export interface ICreateCard {
  execute(data: CreateCardDTO.Input): Promise<CreateCardDTO.Output>;
}

export class CreateCard implements ICreateCard {
  constructor(
    private readonly cardsRepository: ICardsRepository,
    private readonly creditCardCompaniesRepository: ICreditCardCompaniesRepository,
  ) {}

  public async execute(data: CreateCardDTO.Input): Promise<CreateCardDTO.Output> {
    const creditCardCompany = await this.creditCardCompaniesRepository.findOrCreateByName(data.creditCardCompany.name);

    const [expirationMonth, expirationYear] = data.expiration.split('/');
    const card = new Card({
      ...data,
      creditCardCompany,
      expirationMonth,
      expirationYear,
    });

    return this.cardsRepository.save(card);
  }
}
