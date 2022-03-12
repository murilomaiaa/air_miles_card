import { CardsRepository, CreditCardCompaniesRepository } from '@/infra/typeorm/repositories';

export const repositories = {
  ICardsRepository: new CardsRepository(),
  ICreditCardCompaniesRepository: new CreditCardCompaniesRepository(),
};
