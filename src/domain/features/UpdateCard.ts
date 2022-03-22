import AppError from '@/main/errors/AppError';
import { Card, CreditCardCompany } from '../entities';
import { ICardsRepository, ICreditCardCompaniesRepository } from '../repositories';

type CreditCardCompanyInput = { name: string };

export namespace UpdateCardDTO {
  export type Input = {
    id: string;
    number?: string;
    holderName?: string;
    holderEmail?: string;
    expiration?: string;
    cvv?: string;
    creditCardCompany?: CreditCardCompanyInput;
  };

  export type Output = void;
}

export interface IUpdateCard {
  execute(data: UpdateCardDTO.Input): Promise<UpdateCardDTO.Output>;
}

export class UpdateCard implements IUpdateCard {
  constructor(
    private readonly cardsRepository: ICardsRepository,
    private readonly creditCardCompaniesRepository: ICreditCardCompaniesRepository,
  ) {}

  public async execute({ id, ...data }: UpdateCardDTO.Input): Promise<UpdateCardDTO.Output> {
    const c = await this.cardsRepository.findById(id);
    if (!c) {
      throw new AppError('Card not found');
    }

    let creditCardCompany: CreditCardCompany | undefined = undefined;
    if (data.creditCardCompany) {
      creditCardCompany = await this.creditCardCompaniesRepository.findOrCreateByName(data.creditCardCompany.name);
    }
    const dto = c.toDto();
    const expiration = data.expiration ?? `${dto.expirationMonth}/${dto.expirationYear}`;
    const [expirationMonth, expirationYear] = expiration.split('/');
    const card = new Card({
      id,
      creditCardCompany: creditCardCompany ?? c.toDto().creditCardCompany,
      expirationMonth,
      expirationYear,
      cvv: data.cvv ?? dto.cvv,
      holderEmail: data.holderEmail ?? dto.holderEmail,
      holderName: data.holderName ?? dto.holderName,
      number: data.number ?? dto.number,
      updatedAt: new Date(),
    });

    await this.cardsRepository.save(card);
  }
}
