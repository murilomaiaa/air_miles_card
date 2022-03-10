import { getRepository, Repository } from 'typeorm';

import { Plan } from '@/domain/entities';
import { IPlansRepository } from '@/domain/repositories';
import { PlanDB } from '../entities';
import { PlanMapper } from '../mappers/PlanMapper';

export class PlansRepository implements IPlansRepository {
  private readonly repository: Repository<PlanDB>;

  constructor() {
    this.repository = getRepository(PlanDB);
  }

  async findOrCreateByName(name: string): Promise<Plan> {
    let plan: Plan;
    let p = await this.repository.findOne({ where: { name } });

    if (p) {
      plan = PlanMapper.mapOne(p);
    } else {
      p = this.repository.create({ name });
      p = await this.repository.save(p);
      plan = PlanMapper.mapOne(p);
    }

    return plan;
  }
}
