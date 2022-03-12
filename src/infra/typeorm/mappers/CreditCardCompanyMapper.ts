import { CreditCardCompany } from '@/domain/entities';
import { CreditCardCompanyDB } from '../entities';

export class CreditCardCompanyMapper {
  static mapOne(cc: CreditCardCompanyDB): CreditCardCompany {
    return new CreditCardCompany(cc);
  }
}
