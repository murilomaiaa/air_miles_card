import { Plan } from '../entities';

export interface IPlansRepository {
  findOrCreate(name: string): Promise<Plan>;
}
