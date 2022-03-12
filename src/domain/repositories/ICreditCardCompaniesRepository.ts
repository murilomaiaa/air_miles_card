import { CreditCardCompany } from '../entities';

export interface ICreditCardCompaniesRepository {
  findOrCreateByName(name: string): Promise<CreditCardCompany>;
}
