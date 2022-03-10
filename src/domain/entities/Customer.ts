import { BaseEntity, BaseEntityDTO, BaseEntityProps } from './BaseEntity';
import { Plan, PlanPartial, PlanProps } from './Plan';

export type CustomerDTO = BaseEntityDTO & {
  name: string;
  email: string;
  password: string;
  plan: PlanPartial;
};

export type CustomerProps = BaseEntityProps & {
  name: string;
  email: string;
  password: string;
  plan: PlanProps | Plan;
};

export class Customer extends BaseEntity {
  private name: string;
  private email: string;
  private password: string;
  private plan: Plan;

  constructor(props: CustomerProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.plan = props.plan instanceof Plan ? props.plan : new Plan(props.plan);
  }

  toDto(): CustomerDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      plan: this.plan.toPartial(),
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
      deletedBy: this.deletedBy,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
    };
  }
}
