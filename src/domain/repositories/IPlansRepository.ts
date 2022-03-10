import { Plan } from '../entities';

export interface IPlansRepository {
  findOrCreateByName(name: string): Promise<Plan>;
}
