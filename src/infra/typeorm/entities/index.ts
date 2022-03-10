import { CustomerDB } from './CustomerDB';
import { PlanDB } from './PlanDB';

export * from './PlanDB';
export * from './CustomerDB';

export const entities = [PlanDB, CustomerDB];
