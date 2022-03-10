import { Group } from '../entities';

export interface IGroupsRepository {
  findOrCreate(name: string): Promise<Group>;
}
