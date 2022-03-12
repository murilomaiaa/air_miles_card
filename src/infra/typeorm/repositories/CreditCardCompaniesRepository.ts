import { getRepository, Repository } from 'typeorm';

import { CreditCardCompany } from '@/domain/entities';
import { ICreditCardCompaniesRepository } from '@/domain/repositories';
import { CreditCardCompanyDB } from '../entities';
import { CreditCardCompanyMapper } from '../mappers/CreditCardCompanyMapper';

export class CreditCardCompaniesRepository implements ICreditCardCompaniesRepository {
  private readonly repository: Repository<CreditCardCompanyDB>;

  constructor() {
    this.repository = getRepository(CreditCardCompanyDB);
  }

  async findOrCreateByName(name: string): Promise<CreditCardCompany> {
    let creditCardCompany: CreditCardCompany;
    let p = await this.repository.findOne({ where: { name } });

    if (p) {
      creditCardCompany = CreditCardCompanyMapper.mapOne(p);
    } else {
      p = this.repository.create({ name });
      p = await this.repository.save(p);
      creditCardCompany = CreditCardCompanyMapper.mapOne(p);
    }

    return creditCardCompany;
  }
}
