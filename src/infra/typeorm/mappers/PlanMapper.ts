import { Plan } from '@/domain/entities';
import { PlanDB } from '../entities';

export class PlanMapper {
  static mapOne(p: PlanDB): Plan {
    return new Plan({
      id: p.id,
      name: p.name,
      createdAt: p.createdAt,
      deletedAt: p.deletedAt,
      updatedAt: p.updatedAt,
      updatedBy: p.updatedBy,
    });
  }
}
